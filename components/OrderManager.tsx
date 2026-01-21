import { Order } from "@/utils/types";
import { Heading, HStack, Text, VStack } from "@chakra-ui/react";
import StatusSelector from "./StatusSelector";




export default function OrderManager(props: { order: Order }) {
    const { order } = props;
    return (
        <VStack width="full" gap={4} alignItems="start">
            <HStack w="full" gap={12}>
                <VStack alignItems="start" gap={2}>
                    <Heading>Order Details</Heading>
                    <Text fontSize="md" fontWeight="medium"><b>Order Type:</b> {order.orderType.charAt(0).toUpperCase() + order.orderType.slice(1)}</Text>
                    <Text fontSize="md" fontWeight="medium"><b>Scheduled Date:</b> {new Date(order.date).toLocaleDateString()}</Text>
                    <Text fontSize="md" fontWeight="medium"><b>Scheduled Time:</b> {new Date(order.time).toLocaleTimeString()}</Text>
                </VStack>
                <VStack alignItems="start" gap={2}>
                    <Heading>User Info</Heading>
                    <Text fontSize="md" fontWeight="medium"><b>Name:</b> {order.userId}</Text>
                    <Text fontSize="md" fontWeight="medium"><b>Email:</b> {order.userId}</Text>
                    <Text fontSize="md" fontWeight="medium"><b>Phone:</b> {order.userId}</Text>
                </VStack>
            </HStack>
            <VStack alignItems="start" gap={2}>
                <Heading>Order Items</Heading>

            </VStack>
            <VStack alignItems="start" gap={2}>
                <Heading>Manage Order Status</Heading>
                <HStack alignItems="center">
                    <Text fontSize="md" fontWeight="bold">Order Status: </Text>
                    <StatusSelector status={order.status} />
                </HStack>
            </VStack>
        </VStack>
    )
}