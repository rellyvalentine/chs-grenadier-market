// isimplest approach to authentication in Next.js is to keep it client-side.

import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server"


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
