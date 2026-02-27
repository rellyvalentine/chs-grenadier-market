import { v } from "convex/values";
import { internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { cartItemValidator, orderItemValidator } from "../utils/validators";
import { Order, OrderItem, OrderStatus, Timeslot } from "../utils/types";

const DAY_START_HOUR = 7
const DAY_END_HOUR = 16
const TIME_SLOT_DURATION_MINUTES = 30

const MILLISECONDS_PER_SECOND = 1000
const SECONDS_PER_MINUTE = 60
const MINUTES_PER_HOUR = 60

/// MUTATIONS

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

        const newOrderNumber = await ctx.runMutation(internal.orders.incrementOrderCounter)
        if(!newOrderNumber) {
            throw new Error("Failed to increment order counter")
        }

        // Create a new order for the user and set the status to pending by default
        const orderId = await ctx.db.insert("orders", {
            userId: user._id, orderNumber: newOrderNumber, orderType: args.orderType, date: args.date, time: args.time, status: "pending", updatedAt: new Date(Date.now()).getTime(), updatedBy: user._id
        })
        if(!orderId) {
            throw new Error("Failed to create order")
        }

        // Add the cart items to the order
        await ctx.runMutation(internal.orders.addCartItemsToOrder, { orderId: orderId, cartItems: args.cartItems })

        return orderId
    }
})

export const updateOrder = mutation({
    args: {
        orderId: v.id("orders"),
        orderItems: v.array(orderItemValidator),
        orderStatus: v.union(v.literal("pending"), v.literal("fulfilled"), v.literal("cancelled")),
    },
    handler: async (ctx, args): Promise<Id<"orders">> => {
        const user = await ctx.runQuery(api.users.getCurrentUser)
        if(!user) {
            throw new Error("Not authenticated")
        }

        const order = await ctx.runQuery(internal.orders.getOrder, { orderId: args.orderId })
        if(!order) {
            throw new Error("Order not found")
        }

        // Update the order items
        await ctx.runMutation(internal.orders.updateOrderItems, { orderId: args.orderId, orderItems: args.orderItems })

        // Update the item quantities from the order items when the order is fulfilled
        if(args.orderStatus === "fulfilled") {
            await ctx.runMutation(internal.orders.updateItemQuantities, { orderId: args.orderId, orderType: order.orderType })
        }

        // Update the order status
        await ctx.db.patch(args.orderId, { status: args.orderStatus , updatedAt: new Date(Date.now()).getTime(), updatedBy: user._id })

        return args.orderId
    }
})

export const updateOrderItems = internalMutation({
    args: {
        orderId: v.id("orders"),
        orderItems: v.array(orderItemValidator),
    },
    handler: async (ctx, args) => {
        for(const orderItem of args.orderItems) {
            const existingOrderItem = await ctx.db.query("orderItems").withIndex("by_order_item", (q) => q.eq("orderId", args.orderId).eq("itemId", orderItem.itemId)).unique()
            if(existingOrderItem) {
                await ctx.db.patch(existingOrderItem._id, { quantity: orderItem.quantity })
            }
        }
    }
})

export const updateItemQuantities = internalMutation({
    args: {
        orderId: v.id("orders"),
        orderType: v.union(v.literal("donate"), v.literal("pickup")),
    },
    handler: async (ctx, args) => {
        const orderItems = await ctx.db.query("orderItems").withIndex("by_order_item", (q) => q.eq("orderId", args.orderId)).collect()
        for(const orderItem of orderItems) {
            const item = await ctx.db.get(orderItem.itemId)
            if(item) {
                if(args.orderType === "pickup") {
                    await ctx.db.patch(item._id, { quantity: item.quantity - orderItem.quantity })
                }
                else if(args.orderType === "donate") {
                    await ctx.db.patch(item._id, { quantity: item.quantity + orderItem.quantity })
                }
            }
        }
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
            if(cartItem.selected) {
            const orderItemId = await ctx.runMutation(internal.orders.addItemToOrder, { orderId: args.orderId, itemId: cartItem.itemId, quantity: cartItem.quantity })
                if(!orderItemId) {
                    throw new Error("Failed to add cart item to order")
                }
                else {
                    await ctx.db.delete(cartItem._id)
                }
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

export const incrementOrderCounter = internalMutation({
    handler: async (ctx) => {
        const orderCounter = await ctx.db.query("orderCounter").withIndex("by_key", (q) => q.eq("key", "stats")).unique()
        if(!orderCounter) {
            // create a new order counter
            await ctx.runMutation(internal.orders.createOrderCounter)
            return 1
        }
        else {
            // increment the order counter
            await ctx.db.patch(orderCounter._id, { count: orderCounter.count + 1 })
            return orderCounter.count + 1
        }
    }
})

export const createOrderCounter = internalMutation({
    handler: async (ctx) => {
        return await ctx.db.insert("orderCounter", { key: "stats", count: 1 })
    }
})

/// QUERIES

export const getAvailableTimeslots = query({
    args: {
        date: v.number(),
    },
    handler: async (ctx, args): Promise<Timeslot[]> => {
        
        // Timeslots can only occur between 7am and 4pm
        const dayStart = args.date

        // Get the start time to start at 7am
        const startDateTimestamp = dayStart + (DAY_START_HOUR * MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND)
        // Get the end time to end at 4pm
        const endDateTimestamp = dayStart + (DAY_END_HOUR * MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND)

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

export const getUpcomingOrders = query({
    handler: async (ctx): Promise<Order[]> => {
        // Get all orders that are pending and have a date within 7 days of the current date
        const currentDate = new Date(Date.now()).getTime()
        const dateSevenDaysAgo = currentDate - 7 * 24 * MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND
        const dateSevenDaysFromNow = currentDate + 7 * 24 * MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND
        const upcomingOrders = await ctx.db.query("orders").withIndex("by_status_and_date", (q) => q.eq("status", "pending").gte("date", dateSevenDaysAgo).lte("date", dateSevenDaysFromNow)).collect()
        return upcomingOrders.map((order) => ({
            ...order,
            status: order.status as OrderStatus
        }));
    }
})

export const getPastOrders = query({
    args: {
        startDate: v.optional(v.number()),
        endDate: v.optional(v.number()),
    },
    handler: async (ctx, args): Promise<Order[]> => {
        const startDate = args.startDate
        const endDate = args.endDate
        // Get all orders that are fulfilled or cancelled and have a date within the start and end date
        if(startDate && endDate) {
            const pastOrders = await ctx.db.query("orders").withIndex("by_date", (q) => q.gte("date", startDate).lte("date", endDate)).collect()
            return pastOrders.map((order) => ({
                ...order,
                status: order.status as OrderStatus
            }))
        }
        else {
            return []
        }
    }
})

export const getOrder = internalQuery({
    args: {
        orderId: v.id("orders"),
    },
    handler: async (ctx, args): Promise<Order> => {
        const order = await ctx.db.get(args.orderId)
        if(!order) {
            throw new Error("Order not found")
        }
        return {
            ...order,
            status: order.status as OrderStatus
        }
    }
})

export const getOrderItems = query({
    args: {
        orderId: v.id("orders"),
    },
    handler: async (ctx, args): Promise<OrderItem[]> => {
        return await ctx.db.query("orderItems").withIndex("by_order_item", (q) => q.eq("orderId", args.orderId)).collect()
    }
})