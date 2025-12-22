import { VStack } from "@chakra-ui/react";
import CartItemEntry from "./CartItem";
import { CartItem, CartItems } from "@/utils/types";
import { useCallback } from "react";



export default function CartItemList(props: { cartItems: CartItems, type: "donate" | "pickup", disabled?: boolean, onCartItemsChange: (cartItems: CartItems) => void }) {

    const handleSelect = useCallback((item: CartItem) => {
        const newItems = { ...props.cartItems }
        if(props.type === "donate") {
            newItems.donateItems.map((donateItem) => {
                if(donateItem._id === item._id) {
                    donateItem.selected = item.selected
                }
            })
        }
        if(props.type === "pickup") {
            newItems.pickupItems.map((pickupItem) => {
                if(pickupItem._id === item._id) {
                    pickupItem.selected = item.selected
                }
            })
        }
        props.onCartItemsChange(newItems)
    }, [])

    return (
        <VStack>
            {props.type === "donate" && (
                props.cartItems.donateItems.map((item) => (
                    <CartItemEntry key={item._id} cartItem={item} disabled={props.disabled} onSelect={handleSelect} />
                ))
            )}
            {props.type === "pickup" && (
                props.cartItems.pickupItems.map((item) => (
                    <CartItemEntry key={item._id} cartItem={item} disabled={props.disabled} onSelect={handleSelect} />
                ))
            )}
        </VStack>
    )
}