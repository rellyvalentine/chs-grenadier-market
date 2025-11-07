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
}

export type CartItems = {
    donateItems: CartItem[];
    pickupItems: CartItem[];
}

export type Timeslot = {
    date: Date;
    startTime: string;
    available: boolean;
}