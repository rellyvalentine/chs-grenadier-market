import { api } from "@/convex/_generated/api";
import { VStack } from "@chakra-ui/react";
import { useQuery } from "convex/react";
import CartItemEntry from "./CartItem";



export default function CartItemList() {
    const cartItems = useQuery(api.cart.getUserCartItems)

    return (
        <VStack>
            {cartItems && (
                <>
                    {cartItems.donateItems.map((item) => (
                        <CartItemEntry key={item._id} cartItem={item} />
                    ))}
                    {cartItems.pickupItems.map((item) => (
                        <CartItemEntry key={item._id} cartItem={item} />
                    ))}
                </>
            )}
        </VStack>
    )
}