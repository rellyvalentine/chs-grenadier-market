import { api } from "@/convex/_generated/api";
import { CartItem } from "@/utils/types";
import { HStack, Text } from "@chakra-ui/react";
import { useQuery } from "convex/react";
import CartItemQuantity from "./CartItemQuantity";


export default function CartItemEntry(props: { cartItem: CartItem }) {
    const item = useQuery(api.items.getItem, { id: props.cartItem.itemId })
    return (
        <HStack>
            <Text>{item?.name}</Text>
            <CartItemQuantity cartItem={props.cartItem} />
        </HStack>
    )
}
