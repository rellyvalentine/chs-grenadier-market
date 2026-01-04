import { api } from "@/convex/_generated/api";
import { CartItem } from "@/utils/types";
import { Button, HStack, Icon, IconButton, Text } from "@chakra-ui/react";
import { useMutation } from "convex/react";
import { FaMinus, FaPlus } from "react-icons/fa";


export default function CartItemQuantity(props: { cartItem: CartItem, disabled?: boolean }) {

    const addItemToCart = useMutation(api.cart.addItemToCart)
    const removeItemFromCart = useMutation(api.cart.removeItemFromCart)

    return (
        <HStack>
            <IconButton size="sm" padding={2} variant="outline" onClick={() => removeItemFromCart({ itemId: props.cartItem.itemId, type: props.cartItem.type })} disabled={props.disabled}>
                <Icon as={FaMinus} />
            </IconButton>
            <Text fontSize="md" fontWeight="semibold" color={props.disabled ? "gray.500" : "black"}>{props.cartItem.quantity}</Text>
            <IconButton size="sm" padding={2} variant="outline" onClick={() => addItemToCart({ itemId: props.cartItem.itemId, type: props.cartItem.type })} disabled={props.disabled}>
                <Icon as={FaPlus} />
            </IconButton>
        </HStack>
    )
}