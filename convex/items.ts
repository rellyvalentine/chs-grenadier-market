
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
        // image: v.string(),
        category: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.runQuery(api.users.getCurrentUser)
        if(!user) {
            throw new Error("Not authenticated")
        }
        if(user.role !== "ADMIN") {
            throw new Error("Not authorized to perform this action")
        }

        return await ctx.db.insert("items", { name: args.name, description: args.description, category: args.category, isActive: true, quantity: 0 });
    }
});


/// QUERIES

/**
 * Get all active items for users to see
 * @param ctx - The context
 * @returns All active items
 */
export const getActiveItems = query({
    handler: async (ctx) => {
        return await ctx.db.query("items").filter((q) => q.eq(q.field("isActive"), true)).collect() as Item[]
    }
});

export const getItem = query({
    args: {
        id: v.id("items"),
    },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    }
});