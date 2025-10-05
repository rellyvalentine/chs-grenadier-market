

export enum ItemCategories {
    FOOD = "Food",
    CLOTHING = "Clothing",
    OTHER = "Other"
}

export type Item = {
    name: string;
    description: string;
    // image: string;
    category: string;
}