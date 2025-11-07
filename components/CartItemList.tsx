import { api } from "@/convex/_generated/api";
import { VStack } from "@chakra-ui/react";
import { useQuery } from "convex/react";
import CartItemEntry from "./CartItem";
import { CartItems } from "@/utils/types";



export default function CartItemList(props: { cartItems: CartItems, type: "donate" | "pickup", disabled?: boolean }) {
    return (
        <VStack>
            {props.type === "donate" && (
                props.cartItems.donateItems.map((item) => (
                    <CartItemEntry key={item._id} cartItem={item} disabled={props.disabled} />
                ))
            )}
            {props.type === "pickup" && (
                props.cartItems.pickupItems.map((item) => (
                    <CartItemEntry key={item._id} cartItem={item} disabled={props.disabled} />
                ))
            )}
        </VStack>
    )
}