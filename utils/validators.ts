import { v } from "convex/values";


export const itemValidator = v.object({
    _id: v.id("items"),
    name: v.string(),
    description: v.string(),
    category: v.string(),
    isActive: v.boolean(),
    quantity: v.number(),
    _creationTime: v.number(),
})

export const userValidator = v.object({
    _id: v.id("users"),
    _creationTime: v.number(),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.float64()),
    image: v.optional(v.string()),
    name: v.optional(v.string()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.float64()),
    role: v.optional(v.string())
})

export const cartValidator = v.object({
    _id: v.id("cart"),
    userId: v.id("users"),
})

export const cartItemValidator = v.object({
    _id: v.id("cartItems"),
    cartId: v.id("cart"),
    itemId: v.id("items"),
    quantity: v.number(),
})