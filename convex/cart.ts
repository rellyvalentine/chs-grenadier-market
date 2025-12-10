import { v } from "convex/values";
import { internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { api, internal } from "./_generated/api";
import { Doc, Id } from "./_generated/dataModel";
import type { CartItem, CartItems } from "../utils/types";


/// MUTATIONS

/**
 * Create a new cart
 * @param ctx - The context
 * @returns The id of the new cart
 */
export const createCart = internalMutation({
    args: {},
    returns: v.id("cart"),
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx)
        if(!userId) {
            throw new Error("Not authenticated")
        }
        return await ctx.db.insert("cart", { userId: userId })
    }
})

export const addItemToCart = mutation({
    args: {
        itemId: v.id("items"),
        type: v.union(v.literal("donate"), v.literal("pickup")),
    },
    handler: async (ctx, args): Promise<Id<"cartItems"> | null> => {
        return await ctx.runMutation(internal.cart.updateCartItem, { operation: "add", itemId: args.itemId, type: args.type })
    }
})

export const removeItemFromCart = mutation({
    args: {
        itemId: v.id("items"),
        type: v.union(v.literal("donate"), v.literal("pickup")),
    },
    handler: async (ctx, args): Promise<Id<"cartItems"> | null> => {
        return await ctx.runMutation(internal.cart.updateCartItem, { operation: "remove", itemId: args.itemId, type: args.type })
    }
})

export const updateCartItem = internalMutation({
    args: {
        operation: v.union(v.literal("add"), v.literal("remove")),
        itemId: v.id("items"),
        type: v.union(v.literal("donate"), v.literal("pickup")),
    },
    handler: async (ctx, args): Promise<Id<"cartItems"> | null> => {
        // validate user is authenticated
        const userId = await getAuthUserId(ctx)
        if(!userId) {
            throw new Error("Not authenticated")
        }
        
        // get the user's cart or create a new one if it doesn't exist
        let cartId = (await ctx.db.query("cart").withIndex("by_user", (q) => q.eq("userId", userId)).unique())?._id
        if(!cartId) {
            cartId = await ctx.runMutation(internal.cart.createCart)
            if(!cartId) {
                throw new Error("Failed to create cart")
            }
        }

        const cartItem: CartItem | null = await ctx.runQuery(internal.cart.getCartItem, { itemId: args.itemId, type: args.type })
        if(args.operation === "add") {
            if(cartItem) {
                // if the cart item already exists, increment the quantity
                await ctx.db.patch(cartItem._id, { quantity: cartItem.quantity + 1 })
                return cartItem._id
            }
            else {
                // if the cart item does not exist, create it
                return await ctx.db.insert("cartItems", { cartId: cartId, itemId: args.itemId, quantity: 1, type: args.type })
            }
        }
        else if(args.operation === "remove") {
            if(cartItem) {
                // if the quantity is 1, delete the cart item
                if(cartItem.quantity == 1) {
                    await ctx.db.delete(cartItem._id)
                    return null
                }
                // if the quantity is greater than 1, decrement the quantity
                await ctx.db.patch(cartItem._id, { quantity: cartItem.quantity - 1 })
                return cartItem._id
            }
            else {
                throw new Error("Cart item not found")
            }
        }
        return null
    }
})


/// QUERIES

export const getUserCartItems = query({
    handler: async (ctx): Promise<CartItems> => {
        const cartId: Id<"cart"> | null = await ctx.runQuery(internal.cart.getUserCart)
        if (!cartId) {
            return { donateItems: [], pickupItems: [] }
        }
        const cartItems: Doc<"cartItems">[] = await ctx.db
            .query("cartItems")
            .withIndex("by_cart_item", (q) => q.eq("cartId", cartId))
            .collect()

        // Narrow each Doc<"cartItems"> to the CartItem shape by picking fields
        const result: CartItem[] = cartItems.map((cartItem: Doc<"cartItems">) => ({
            _id: cartItem._id,
            cartId: cartItem.cartId,
            itemId: cartItem.itemId,
            quantity: cartItem.quantity,
            type: cartItem.type,
            selected: undefined,
        }))

        // filter the items by order type (donate or pickup)
        const donateItems: CartItem[] = result.filter((item: CartItem) => item.type === "donate")
        const pickupItems: CartItem[] = result.filter((item: CartItem) => item.type === "pickup")

        const userCartItems: CartItems = {
            donateItems: donateItems,
            pickupItems: pickupItems,
        }

        return userCartItems
    }
})

export const getUserCart = internalQuery({
    handler: async (ctx): Promise<Id<"cart"> | undefined> => {
        const userId = await getAuthUserId(ctx)
        if(!userId) {
            throw new Error("Not authenticated")   
        }
        const cartId = (await ctx.db.query("cart").withIndex("by_user", (q) => q.eq("userId", userId)).unique())?._id
        return cartId
    }
});

export const getCartItem = internalQuery({
    args: {
        itemId: v.id("items"),
        type: v.union(v.literal("donate"), v.literal("pickup")),
    },
    handler: async (ctx, args): Promise<CartItem | null> => {
        const cartId: Id<"cart"> | null = await ctx.runQuery(internal.cart.getUserCart)
        if(!cartId) {
            throw new Error("Cart not found")
        }
        // get the cart item from the database by cart id, item id, and type
        const result = await ctx.db.query("cartItems").withIndex("by_cart_item_and_type", 
            (q) => q.eq("cartId", cartId).eq("itemId", args.itemId).eq("type", args.type)).unique()

        // return the cart item if it exists, otherwise return null
        const cartItem: CartItem | null = result ? {
            _id: result._id,
            cartId: result.cartId,
            itemId: result.itemId,
            quantity: result.quantity,
            type: result.type,
            selected: false,
        } : null
        return cartItem
    }
})

// export const itemInCart = query({
//     args: {
//         itemId: v.id("items"),
//     },
//     handler: async (ctx, args) => {
//         const cart = await ctx.runQuery(api.cart.getUserCart)
//         if(!cart) {
//             return false
//         }
//         // return true if the cart item entry exists with the given cart id and item id
//         return await ctx.db.query("cartItems").withIndex("by_cart_item", (q) => q.eq("cartId", cart._id).eq("itemId", args.itemId)).unique() !== null
//     }

// })

