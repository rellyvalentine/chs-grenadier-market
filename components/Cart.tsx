import { Heading, HStack, VStack, Text, RadioCard, Box, Input } from "@chakra-ui/react";
import CartItemList from "./CartItemList";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Timeslots from "./Timeslots";
import * as DateFNS from "date-fns"
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

type TExcludeDateIntervals = {
    start: Date;
    end: Date;
}[];

export default function Cart() {

    const cartItems = useQuery(api.cart.getUserCartItems)

    // default order type will be set to donate if there are both donate and pickup items in the cart 
    // otherwise it will be whichever has at least one item
    const [orderType, setOrderType] = useState<"donate" | "pickup">("donate");
    useEffect(() => {
        if(cartItems)
        {
            if(cartItems.donateItems.length > 0 && cartItems.pickupItems.length > 0) {
                setOrderType("donate")
            } else if(cartItems.donateItems.length > 0) {
                setOrderType("donate")
            } else {
                setOrderType("pickup")
            }
        }
    }, [cartItems])

    
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    const excludeDates: TExcludeDateIntervals = [
        {
            start: new Date(0),
            end: DateFNS.subDays(new Date(), 1)
        }
    ]

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
                                        <CartItemList cartItems={cartItems} type="donate" disabled={orderType === "pickup"} />
                                    </Box>
                                </VStack>
                            )}
                            {cartItems.pickupItems.length > 0 && (
                                <VStack height="full" width="full" border="1px solid" borderColor="gray.200" borderRadius="md" padding={4} backgroundColor={orderType === "pickup" ? "white" : "#F4F4F5"}>
                                    <Heading size="md" fontWeight="semibold" color={orderType === "pickup" ? "black" : "gray.500"}>Pickup Items</Heading>
                                    <Box flex="1" overflowY="auto" width="full">
                                        <CartItemList cartItems={cartItems} type="pickup" disabled={orderType === "donate"} />
                                    </Box>
                                </VStack>
                            )}
                        </>
                    )}
                </HStack>
            </VStack>
            <VStack width="full" gap={2}>
                <Heading size="lg">Select the pickup date and time</Heading>
                <HStack width="full" justify="space-evenly" align="stretch" gap={4}>
                    <VStack alignItems="start">
                        <Heading size="md" fontWeight="semibold">Choose a date</Heading>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date: Date | null) => setSelectedDate(date)}
                            excludeDateIntervals={excludeDates}
                            inline
                        />
                    </VStack>
                    <VStack alignItems="start">
                        <Heading size="md" fontWeight="semibold">Choose a timeslot</Heading>
                        <Timeslots date={selectedDate} />
                    </VStack>
                </HStack>
            </VStack>
        </VStack>
    )
}