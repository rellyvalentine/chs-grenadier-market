import { Heading, HStack, VStack, Text, RadioCard, Box, Input, Skeleton } from "@chakra-ui/react";
import CartItemList from "./CartItemList";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import PickupScheduler from "./PickupScheduler";
import { CartItem, CartItems, OrderDraft } from "@/utils/types";

export default function Cart(props: { onOrderDraftChange: (draft: OrderDraft) => void }) {

    const [orderType, setOrderType] = useState<"donate" | "pickup">("donate")
    const [cartItems, setCartItems] = useState<CartItems | null>(null)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedTime, setSelectedTime] = useState<number | null>(null)

    const initialCartItems = useQuery(api.cart.getUserCartItems)

    // Initialize the cart items state
    useEffect(() => {
        if(initialCartItems) {
            setCartItems(initialCartItems)
        }
    }, [initialCartItems])

    // Update the order draft when the order type, cart items, selected date and time are changed
    useEffect(() => {
        if(cartItems) {
            const items = orderType === "donate" ? cartItems.donateItems : cartItems.pickupItems;
            props.onOrderDraftChange({
                orderType: orderType,
                date: selectedDate ?? undefined,
                time: selectedTime ?? undefined,
                cartItems: items,
            })
        }
    }, [orderType, cartItems, selectedDate, selectedTime])

    const handleCartItemsChange = (cartItems: CartItems) => {
        setCartItems(cartItems)
    }
    // Memoize each of the components to handle state changes
    const donateList = useMemo(() => {
        if(cartItems) {
            return (
                <CartItemList cartItems={cartItems} type="donate" disabled={orderType === "pickup"} onCartItemsChange={handleCartItemsChange} />
            )
        }
        return null
    }, [cartItems, orderType])

    const pickupList = useMemo(() => {
        if(cartItems) {
            return (
                <CartItemList cartItems={cartItems} type="pickup" disabled={orderType === "donate"} onCartItemsChange={handleCartItemsChange} />
            )
        }
        return null
    }, [cartItems, orderType])

    const handlePickupChange = useCallback((date: Date, time: number) => {
        setSelectedDate(date)
        setSelectedTime(time)
    }, [])

    const pickupScheduler = useMemo(() => {
        return (
            <PickupScheduler onChange={handlePickupChange} />
        )
    }, [])

    return (
        <VStack w="max-content" marginX="auto" gap={8}>
            <VStack width="full" gap={2}>
                <Heading size="xl" fontWeight="semibold">Select which order you want to place</Heading>
                <RadioCard.Root width="full" defaultValue={orderType} variant="outline">
                    <HStack width="full" justify="space-between" gap={4}>
                        {cartItems ? (
                            <>
                                {cartItems.donateItems.length > 0 && (
                                    <RadioCard.Item value="donate" onChange={() => setOrderType("donate")} _checked={{ borderColor: "primary.600", bg: "primary.100/50", shadowColor: "primary.700" }}>
                                        <RadioCard.ItemHiddenInput />
                                        <RadioCard.ItemControl>
                                            <RadioCard.ItemText fontSize="lg">Donate</RadioCard.ItemText>
                                        </RadioCard.ItemControl>
                                    </RadioCard.Item>
                                )}
                                {cartItems.pickupItems.length > 0 && (
                                    <RadioCard.Item value="pickup" onChange={() => setOrderType("pickup")} _checked={{ borderColor: "primary.600", bg: "primary.100/50", shadowColor: "primary.700" }}>
                                        <RadioCard.ItemHiddenInput />
                                        <RadioCard.ItemControl>
                                            <RadioCard.ItemText fontSize="lg">Pickup</RadioCard.ItemText>
                                        </RadioCard.ItemControl>
                                    </RadioCard.Item>
                                )}
                            </>
                        ) : (
                            <Skeleton height="104px" width="full" />
                        )}
                    </HStack>
                </RadioCard.Root>
            </VStack>
            <VStack width="full" gap={2}>
                <Heading size="xl" fontWeight="semibold">Select the items you want for this order</Heading>
                <HStack width="full" justify="space-between" align="stretch" gap={4}>
                    {cartItems ? (
                        <>
                            {cartItems.donateItems.length > 0 && (
                                <VStack maxH="500px" width="full" border="1px solid" borderColor="gray.200" borderRadius="md" padding={4} backgroundColor={orderType === "donate" ? "white" : "#F4F4F5"}>
                                    <Heading size="lg" fontWeight="medium" color={orderType === "donate" ? "black" : "gray.500"}>Donate Items</Heading>
                                    <Box flex="1" overflowY="auto" width="full">
                                        {donateList}
                                    </Box>
                                </VStack>
                            )}
                            {cartItems.pickupItems.length > 0 && (
                                <VStack height="full" width="full" border="1px solid" borderColor="gray.200" borderRadius="md" padding={4} backgroundColor={orderType === "pickup" ? "white" : "#F4F4F5"}>
                                    <Heading size="lg" fontWeight="medium" color={orderType === "pickup" ? "black" : "gray.500"}>Pickup Items</Heading>
                                    <Box flex="1" overflowY="auto" width="full">
                                        {pickupList}
                                    </Box>
                                </VStack>
                            )}
                        </>
                    ) : (
                        <Skeleton height="275px" width="full" />
                    )}
                </HStack>
            </VStack>
            {/* Use a ref to store the selected date and time while preventing re-rendering */}
            {pickupScheduler}
        </VStack>
    )
}