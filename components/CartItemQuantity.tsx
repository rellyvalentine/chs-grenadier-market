import { api } from "@/convex/_generated/api";
import { CartItem } from "@/utils/types";
import { Button, HStack, Text } from "@chakra-ui/react";
import { useMutation } from "convex/react";


export default function CartItemQuantity(props: { cartItem: CartItem, disabled?: boolean }) {

    const addItemToCart = useMutation(api.cart.addItemToCart)
    const removeItemFromCart = useMutation(api.cart.removeItemFromCart)

    return (
        <HStack>
            <Button onClick={() => removeItemFromCart({ itemId: props.cartItem.itemId, type: props.cartItem.type })} disabled={props.disabled}>-</Button>
            <Text color={props.disabled ? "gray.500" : "black"}>{props.cartItem.quantity}</Text>
            <Button onClick={() => addItemToCart({ itemId: props.cartItem.itemId, type: props.cartItem.type })} disabled={props.disabled}>+</Button>
        </HStack>
    )
}