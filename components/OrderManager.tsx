import { Order, OrderItem, OrderStatus } from "@/utils/types";
import { Heading, HStack, Text, VStack } from "@chakra-ui/react";
import StatusSelector from "./StatusSelector";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import OrderItemList from "./OrderItemList";
import { useEffect, useMemo, useState } from "react";




export default function OrderManager(props: { order: Order, onOrderChange: (orderItems: OrderItem[]) => void, onStatusChange: (status: OrderStatus) => void }) {
    const { order, onOrderChange, onStatusChange } = props;

    const [orderStatus, setOrderStatus] = useState<OrderStatus>(order.status)
    const [orderItems, setOrderItems] = useState<OrderItem[]>([])

    // Update the parent order state when the order items change
    useEffect(() => {
        onOrderChange(orderItems)
    }, [orderItems])

    const initialOrderItems = useQuery(api.orders.getOrderItems, { orderId: order._id }) || [];
    useEffect(() => {
        setOrderItems(initialOrderItems)
    }, [initialOrderItems])

    // Callback to update the order items state
    const handleOrderItemsChange = (orderItems: OrderItem[]) => {
        setOrderItems(orderItems)
    }
    
    // Update the parent order status state when the order status changes
    useEffect(() => {
        onStatusChange(orderStatus)
    }, [orderStatus])

    // Callback to update the order status state
    const handleStatusChange = (status: OrderStatus) => {
        setOrderStatus(status)
    }

    const orderItemList = useMemo(() => {
        return (
            <OrderItemList orderItems={orderItems} onOrderItemsChange={handleOrderItemsChange} />
        )
    }, [orderItems])

    const statusSelector = useMemo(() => {
        return (
            <StatusSelector status={orderStatus} onStatusChange={handleStatusChange} />
        )
    }, [orderStatus])

    const user = useQuery(api.users.getUserById, { userId: order.userId });
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
                    <Text fontSize="md" fontWeight="medium"><b>Name:</b> {user?.name}</Text>
                    <Text fontSize="md" fontWeight="medium"><b>Email:</b> {user?.email}</Text>
                    <Text fontSize="md" fontWeight="medium"><b>Phone:</b> {user?.phone}</Text>
                </VStack>
            </HStack>
            <VStack alignItems="start" gap={2}>
                <Heading>Order Items</Heading>
                {orderItemList}
            </VStack>
            <VStack alignItems="start" gap={2}>
                <Heading>Manage Order Status</Heading>
                <HStack alignItems="center">
                    <Text fontSize="md" fontWeight="bold">Order Status: </Text>
                    {statusSelector}
                </HStack>
            </VStack>
        </VStack>
    )
}