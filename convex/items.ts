
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import { Item } from "../utils/types";


/// MUTATIONS

/**
 * Create a new item
 * Constraint: Only admins can create items
 * @param args - The arguments for the mutation
 * @returns The id of the new item
 */
export const createItem = mutation({
    args: {
        name: v.string(),
        description: v.string(),
        image: v.id("_storage"),
        category: v.string(),
        quantity: v.number(),
        limit: v.number(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.runQuery(api.users.getCurrentUser)
        if(!user) {
            throw new Error("Not authenticated")
        }
        if(user.role !== "ADMIN") {
            throw new Error("Not authorized to perform this action")
        }

        return await ctx.db.insert("items", { name: args.name, description: args.description, category: args.category, isActive: true, quantity: args.quantity, image: args.image, limit: args.limit });
    }
});

export const updateItem = mutation({
    args: {
        id: v.id("items"),
        name: v.optional(v.string()),
        description: v.optional(v.string()),
        category: v.optional(v.string()),
        quantity: v.optional(v.number()),
        limit: v.optional(v.number()),
        image: v.optional(v.id("_storage")),
        isActive: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const item = await ctx.db.get(args.id)
        if(!item) {
            throw new Error("Item not found")
        }
        await ctx.db.patch(args.id, { name: args.name ?? item.name, description: args.description ?? item.description, category: args.category ?? item.category, quantity: args.quantity ?? item.quantity, image: args.image ?? item.image, isActive: args.isActive ?? item.isActive, limit: args.limit ?? item.limit });
        return item._id
    }
});

export const generateUploadUrl = mutation({
    args: {},
    handler: async (ctx) => {
      return await ctx.storage.generateUploadUrl();
    },
});


/// QUERIES

export const getItems = query({
    handler: async (ctx) => {
        const items = await ctx.db.query("items").collect() as Item[]
        const itemsWithImage = await Promise.all(items.map(async (item) => ({
            ...item,
            image: item.image ? await ctx.storage.getUrl(item.image) : null,
        })))
        return itemsWithImage
    }
});

/**
 * Get all active items for users to see
 * @param ctx - The context
 * @returns All active items
 */
export const getActiveItems = query({
    handler: async (ctx) => {
        const items = await ctx.db.query("items").filter((q) => q.eq(q.field("isActive"), true)).collect() as Item[]
        const itemsWithImage = await Promise.all(items.map(async (item) => ({
            ...item,
            image: item.image ? await ctx.storage.getUrl(item.image) : null,
        })))
        return itemsWithImage
    }
});

export const getItem = query({
    args: {
        id: v.id("items"),
    },
    handler: async (ctx, args) => {
        const item = await ctx.db.get(args.id);
        if(!item) {
            throw new Error("Item not found")
        }
        const itemImage = await ctx.storage.getUrl(item.image)
        return {
            ...item,
            image: itemImage,
        }
    }
});