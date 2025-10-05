import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...authTables,
    numbers: defineTable({
    value: v.number(),
  }),

  users: defineTable({
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.float64()),
    image: v.optional(v.string()),
    isAnonymous: v.optional(v.boolean()),
    name: v.optional(v.string()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.float64()),
    role: v.optional(v.string())
  })
    .index("email", ["email"])
    .index("phone", ["phone"]),

  items: defineTable({
    name: v.string(),
    description: v.string(),
    quantity: v.number(),
    // image: v.string(),
    category: v.string(),
    isActive: v.boolean(),
    deletedAt: v.optional(v.number())
  })


});
