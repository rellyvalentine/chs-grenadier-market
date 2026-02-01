// isimplest approach to authentication in Next.js is to keep it client-side.

import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server"
import { Id } from "./_generated/dataModel";
import { v } from "convex/values";
import { User } from "../utils/types";


/// QUERIES

/**
 * Get the current user
 * @param ctx - The context
 * @returns The current user
 */
export const getCurrentUser = query(async (ctx) => {
    const userId = await getAuthUserId(ctx)
    if(!userId) {
        return null;
    }
    const user = await ctx.db.get(userId)
    return user        
})

export const getUserById = query({
    args: {
        userId: v.id("users"),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.userId)
        return user
    }
})

export const getUsers = query({
    args: {
        userIds: v.array(v.id("users")),
    },
    handler: async (ctx, args): Promise<User[]> => {
        const users = await Promise.all(args.userIds.map(userId => ctx.db.get(userId)))
        return users.map((user) => user ? { _id: user._id, email: user.email, name: user.name, phone: user.phone, role: user.role } : null).filter((user) => user !== null)
    }
})