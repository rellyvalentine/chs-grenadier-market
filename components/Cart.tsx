import { Heading, HStack, VStack, Text, RadioCard, Box, Input } from "@chakra-ui/react";
import CartItemList from "./CartItemList";
import { useCallback, useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import PickupScheduler from "./PickupScheduler";
import { CartItem, CartItems, OrderDraft } from "@/utils/types";

export default function Cart(props: { onOrderDraftChange: (draft: OrderDraft) => void }) {

    const cartItems = useQuery(api.cart.getUserCartItems)

    // Set the initial order type
    const [orderType, setOrderType] = useState<"donate" | "pickup">("donate");
    useEffect(() => {
        if(cartItems)
        {
            // Default order type will be set to donate if there are both donate and pickup items in the cart 
            // otherwise it will be whichever has at least one item in the cart
            if(cartItems.donateItems.length > 0 && cartItems.pickupItems.length > 0) {
                setOrderType("donate")
            } else if(cartItems.donateItems.length > 0) {
                setOrderType("donate")
            } else {
                setOrderType("pickup")
            }
        }
    }, [cartItems])

    // Use a ref to store the selected date and time while preventing re-rendering
    const pickupRef = useRef<{ date: Date, time: number } | null>(null)

    // Update the order draft when the pickup date and time are changed
    const handlePickupChange = useCallback((date: Date, time: number) => {
        pickupRef.current = { date, time }
        if(cartItems) {
            const items = orderType === "donate" ? cartItems.donateItems : cartItems.pickupItems;
            props.onOrderDraftChange({
                orderType: orderType,
                date: date,
                time: time,
                cartItems: items,
            })
        }
    }, [])

    // Use a ref to store the cart items while preventing re-rendering
    const cartItemsRef = useRef<CartItems>(cartItems)

    // Update the order draft when the cart items are changed
    const handleCartItemsChange = useCallback((cartItems: CartItems) => {
        console.log("Cart Items Change", cartItems)
        cartItemsRef.current = cartItems
        if(cartItems) {
            const items = orderType === "donate" ? cartItems.donateItems : cartItems.pickupItems;
            props.onOrderDraftChange({
                orderType: orderType,
                date: pickupRef.current?.date,
                time: pickupRef.current?.time,
                cartItems: items,
            })
        }
    }, [])

    // Update the order draft when the order type is changed
    useEffect(() => {
        console.log("Order Update")
        let draft: OrderDraft = {
            orderType: orderType,
            date: pickupRef.current?.date,
            time: pickupRef.current?.time,
            cartItems: [],
        }
        if(cartItems) {
            const items = orderType === "donate" ? cartItems.donateItems : cartItems.pickupItems;
            draft.cartItems = items;
        }
        props.onOrderDraftChange(draft)
    }, [orderType])


    return (
        <VStack margin={8} gap={8}>
            <VStack width="full" gap={2}>
                <Heading size="lg">Select which order you want to place</Heading>
                <RadioCard.Root width="full" defaultValue={orderType}>
                    <HStack width="full" justify="space-between" gap={4}>
                        {cartItems && (
                            <>
                                {cartItems.donateItems.length > 0 && (
                                    <RadioCard.Item value="donate" onChange={() => setOrderType("donate")}>
                                        <RadioCard.ItemHiddenInput />
                                        <RadioCard.ItemControl>
                                            <RadioCard.ItemText>Donate</RadioCard.ItemText>
                                        </RadioCard.ItemControl>
                                    </RadioCard.Item>
                                )}
                                {cartItems.pickupItems.length > 0 && (
                                    <RadioCard.Item value="pickup" onChange={() => setOrderType("pickup")}>
                                        <RadioCard.ItemHiddenInput />
                                        <RadioCard.ItemControl>
                                            <RadioCard.ItemText>Pickup</RadioCard.ItemText>
                                        </RadioCard.ItemControl>
                                    </RadioCard.Item>
                                )}
                            </>
                        )}
                    </HStack>
                </RadioCard.Root>
            </VStack>
            <VStack width="full" gap={2}>
                <Heading size="lg">Select the items you want for this order</Heading>
                <HStack width="full" justify="space-between" align="stretch" gap={4}>
                    {cartItems && (
                        <>
                            {cartItems.donateItems.length > 0 && (
                                <VStack maxH="500px" width="full" border="1px solid" borderColor="gray.200" borderRadius="md" padding={4} backgroundColor={orderType === "donate" ? "white" : "#F4F4F5"}>
                                    <Heading size="md" fontWeight="semibold" color={orderType === "donate" ? "black" : "gray.500"}>Donate Items</Heading>
                                    <Box flex="1" overflowY="auto" width="full">    
                                        <CartItemList cartItems={cartItems} type="donate" disabled={orderType === "pickup"} onCartItemsChange={handleCartItemsChange} />
                                    </Box>
                                </VStack>
                            )}
                            {cartItems.pickupItems.length > 0 && (
                                <VStack height="full" width="full" border="1px solid" borderColor="gray.200" borderRadius="md" padding={4} backgroundColor={orderType === "pickup" ? "white" : "#F4F4F5"}>
                                    <Heading size="md" fontWeight="semibold" color={orderType === "pickup" ? "black" : "gray.500"}>Pickup Items</Heading>
                                    <Box flex="1" overflowY="auto" width="full">
                                        <CartItemList cartItems={cartItems} type="pickup" disabled={orderType === "donate"} onCartItemsChange={handleCartItemsChange} />
                                    </Box>
                                </VStack>
                            )}
                        </>
                    )}
                </HStack>
            </VStack>
            {/* Use a ref to store the selected date and time while preventing re-rendering */}
            <PickupScheduler onChange={handlePickupChange} />
        </VStack>
    )
}