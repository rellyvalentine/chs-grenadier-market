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

  /**
   * Users table
   * @description Users table
   * @param email - Email of the user
   * @param emailVerificationTime - Time of email verification
   * @param image - Image of the user
   * @param name - Name of the user
   * @param phone - Phone of the user
   * @param phoneVerificationTime - Time of phone verification
   * @param role - Role of the user
   */
  users: defineTable({
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.float64()),
    image: v.optional(v.string()),
    name: v.optional(v.string()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.float64()),
    role: v.optional(v.string())
  })
    .index("email", ["email"])
    .index("phone", ["phone"]),

  /**
   * Items table
   * @description Items table
   * @param name - Name of the item
   * @param description - Description of the item
   * @param quantity - Quantity of the item
   * @param category - Category of the item
   * @param isActive - Whether the item is active
   * @param deletedAt - Time of deletion
   */
  items: defineTable({
    name: v.string(),
    description: v.string(),
    quantity: v.number(),
    // image: v.string(),
    category: v.string(),
    isActive: v.boolean(),
    deletedAt: v.optional(v.number())
  }),

  /**
   * Cart table
   * @description Cart table
   * @param userId - User id
   */
  cart: defineTable({
    userId: v.id("users"),
  })
  .index("by_user", ["userId"]),

  /**
   * Cart items table
   * @description Cart items table
   * @param itemId - Item id
   * @param cartId - Cart id
   * @param quantity - Quantity of the item
   * @param type - Type of the item
   */
  cartItems: defineTable({
    itemId: v.id("items"),
    cartId: v.id("cart"),
    quantity: v.number(),
    type: v.union(v.literal("donate"), v.literal("pickup")),
  })
  .index("by_cart_item", ["cartId", "itemId"])
  .index("by_cart_item_and_type", ["cartId", "itemId", "type"]),

});
