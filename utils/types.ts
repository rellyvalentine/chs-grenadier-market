import { Id } from "../convex/_generated/dataModel";



export enum ItemCategories {
    FOOD = "Food",
    CLOTHING = "Clothing",
    OTHER = "Other"
}

export type Item = {
    _id: Id<"items">;
    _creationTime: number;
    deletedAt?: number | undefined;
    name: string;
    description: string;
    quantity: number;
    category: string;
    isActive: boolean;
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
    userId: Id<"users">;
    orderType: "donate" | "pickup";
    date: number;
    time: number;
    status: "pending" | "fulfilled" | "cancelled";
    updatedAt: number;
    updatedBy: Id<"users">;
}

export type OrderDraft = {
    orderType: "donate" | "pickup";
    date: Date | undefined;
    time: number | undefined;
    cartItems: CartItem[];
}