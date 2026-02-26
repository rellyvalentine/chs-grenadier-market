import { Id } from "../convex/_generated/dataModel";



export enum ItemCategories {
    FOOD = "Food",
    CLOTHING = "Clothing",
    SUPPLIES = "Supplies",
    OTHER = "Other"
}

export enum ItemStatus {
    ACTIVE = "Active",
    INACTIVE = "Inactive"
}

export enum OrderStatus {
    PENDING = "pending",
    FULFILLED = "fulfilled",
    CANCELLED = "cancelled"
}

export type Item = {
    _id: Id<"items">;
    _creationTime: number;
    deletedAt?: number | undefined;
    name: string;
    description: string;
    quantity: number;
    limit: number;
    category: string;
    isActive: boolean;
    image: string | null;
}

export type CartItem = {
    _id: Id<"cartItems">;
    cartId: Id<"cart">;
    itemId: Id<"items">;
    quantity: number;
    type: "donate" | "pickup";
    selected: boolean;
}

export type CartItems = {
    donateItems: CartItem[];
    pickupItems: CartItem[];
}

export type Timeslot = {
    date: number;
    startTime: number;
    available: boolean;
}

export type Order = {
    _id: Id<"orders">;
    orderNumber: number;
    userId: Id<"users">;
    orderType: "donate" | "pickup";
    date: number;
    time: number;
    status: OrderStatus;
    updatedAt: number;
    updatedBy: Id<"users">;
}

export type OrderDraft = {
    orderType: "donate" | "pickup";
    date: Date | undefined;
    time: number | undefined;
    cartItems: CartItem[];
}

export type OrderItem = {
    _id: Id<"orderItems">;
    orderId: Id<"orders">;
    itemId: Id<"items">;
    quantity: number;
    _creationTime: number;
}

export type User = {
    _id: Id<"users">;
    email: string | undefined;
    name: string | undefined;
    phone: string | undefined;
    role: string | undefined;
}