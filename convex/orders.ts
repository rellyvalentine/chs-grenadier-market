import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { cartItemValidator } from "../utils/validators";
import { Timeslot } from "../utils/types";

const DAY_START_HOUR = 7
const DAY_END_HOUR = 16
const TIME_SLOT_DURATION_MINUTES = 30

const MILLISECONDS_PER_SECOND = 1000
const SECONDS_PER_MINUTE = 60
const MINUTES_PER_HOUR = 60

export const createOrder = mutation({
    args: {
        orderType: v.union(v.literal("donate"), v.literal("pickup")),
        date: v.number(),
        time: v.number(),
        cartItems: v.array(cartItemValidator)
    },
    handler: async (ctx, args): Promise<Id<"orders">> => {
        const user = await ctx.runQuery(api.users.getCurrentUser)
        if(!user) {
            throw new Error("Not authenticated")
        }

        // Create a new order for the user and set the status to pending by default
        const orderId = await ctx.db.insert("orders", {
            userId: user._id, orderType: args.orderType, date: args.date, time: args.time, status: "pending"
        })
        if(!orderId) {
            throw new Error("Failed to create order")
        }

        // Add the cart items to the order
        await ctx.runMutation(internal.orders.addCartItemsToOrder, { orderId: orderId, cartItems: args.cartItems })

        return orderId
    }
})

export const addCartItemsToOrder = internalMutation({
    args: {
        orderId: v.id("orders"),
        cartItems: v.array(cartItemValidator)   
    },
    handler: async (ctx, args) => {
        // Add each cart item to the order
        for(const cartItem of args.cartItems) {
            const orderItemId = await ctx.runMutation(internal.orders.addItemToOrder, { orderId: args.orderId, itemId: cartItem.itemId, quantity: cartItem.quantity })
            if(!orderItemId) {
                throw new Error("Failed to add cart item to order")
            }
            else {
                await ctx.db.delete(cartItem._id)
            }
        }
        return true
    }
})

export const addItemToOrder = internalMutation({
    args: {
        orderId: v.id("orders"),
        itemId: v.id("items"),
        quantity: v.number(),
    }, 
    handler: async (ctx, args): Promise<Id<"orderItems">> => {
        // Check if the order item already exists
        const orderItem = await ctx.db.query("orderItems").withIndex("by_order_item", (q) => q.eq("orderId", args.orderId).eq("itemId", args.itemId)).unique()
        if(orderItem) {
            throw new Error("Order item already exists")
        }

        // Add the order item to the order
        return await ctx.db.insert("orderItems", { orderId: args.orderId, itemId: args.itemId, quantity: args.quantity })
    }
})

export const getAvailableTimeslots = query({
    args: {
        date: v.number(),
    },
    handler: async (ctx, args): Promise<Timeslot[]> => {
        
        // Timeslots can only occur between 7am and 4pm
        const dayStart = args.date

        // Get the start time to start at 7am
        const startDateTimestamp = dayStart + (DAY_START_HOUR * MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND)
        // console.log("Start date timestamp: ", new Date(startDateTimestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'America/New_York' }))
        // Get the end time to end at 4pm
        const endDateTimestamp = dayStart + (DAY_END_HOUR * MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND)
        // console.log("End date timestamp: ", new Date(endDateTimestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'America/New_York' }))

        // Each timeslot is 30 minutes
        let timeslots: Timeslot[] = [];
        for(let i = startDateTimestamp; i < endDateTimestamp; i += (TIME_SLOT_DURATION_MINUTES * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND)) {

            // Check if the timeslot is already taken
            const timeslot = await ctx.db.query("orders").withIndex("by_date_and_time", (q) => q.eq("date", args.date).eq("time", i)).unique()
            timeslots.push({
                date: args.date,
                startTime: i,
                available: (i > Date.now() || !!timeslot)
            })
        }
                
        return timeslots;
    }
})