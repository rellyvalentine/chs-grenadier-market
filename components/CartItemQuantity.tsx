import { api } from "@/convex/_generated/api";
import { CartItem } from "@/utils/types";
import { Button, HStack, Icon, IconButton, Text } from "@chakra-ui/react";
import { useMutation } from "convex/react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { toaster } from "./ui/toaster";


export default function CartItemQuantity(props: { cartItem: CartItem, disabled?: boolean }) {

    const addItemToCart = useMutation(api.cart.addItemToCart)
    const handleAddItemToCart = async () => {
        const result = await addItemToCart({ itemId: props.cartItem.itemId, type: props.cartItem.type })
        if (!result.success) {
            toaster.create({
                title: "Failed to add item to cart",
                description: result.message,
                type: "error",
            })
        }
    }

    const removeItemFromCart = useMutation(api.cart.removeItemFromCart)
    const handleRemoveItemFromCart = async () => {
        const result = await removeItemFromCart({ itemId: props.cartItem.itemId, type: props.cartItem.type })
        if (!result) {
            toaster.create({
                title: "Failed to remove item from cart",
                description: "Please try again",
                type: "error",
            })
        }
    }

    return (
        <HStack>
            <IconButton size="sm" padding={2} variant="outline" onClick={handleRemoveItemFromCart} disabled={props.disabled}>
                <Icon as={FaMinus} />
            </IconButton>
            <Text fontSize="md" fontWeight="semibold" color={props.disabled ? "gray.500" : "black"}>{props.cartItem.quantity}</Text>
            <IconButton size="sm" padding={2} variant="outline" onClick={handleAddItemToCart} disabled={props.disabled}>
                <Icon as={FaPlus} />
            </IconButton>
        </HStack>
    )
}