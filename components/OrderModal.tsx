import { Box, Button, CloseButton, Dialog, Icon, IconButton, Portal, Text } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster"
import { useCallback, useRef, useState } from "react";
import { Order, OrderItem, OrderStatus } from "@/utils/types";
import OrderManager from "./OrderManager";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FaPenToSquare } from "react-icons/fa6";


export default function OrderModal(props: { order: Order, variant: "table" | "card" }) {
    const { order, variant } = props;
    const [open, setOpen] = useState<boolean>(false)

    const itemsRef = useRef<OrderItem[] | null>(null)
    const statusRef = useRef<"pending" | "fulfilled" | "cancelled">(order.status)

    const handleOrderChange = useCallback((orderItems: OrderItem[]) => {
        itemsRef.current = orderItems
    }, [])
    const handleStatusChange = useCallback((status: OrderStatus) => {
        statusRef.current = status
    }, [])

    const updateOrder = useMutation(api.orders.updateOrder)

    const handleSubmit = async () => {
        if(itemsRef.current) {
            const orderItems = itemsRef.current
            const orderStatus = statusRef.current
            const orderId = order._id
            const result = await updateOrder({ orderId: orderId, orderItems: orderItems, orderStatus: orderStatus })
            if(result) {
            toaster.create({
                    title: "Order updated successfully",
                    description: "The order has been updated successfully",
                    type: "success",
                })
                setOpen(false)
            }
            else {
                toaster.create({
                    title: "Failed to update order",
                    description: "The order was not updated successfully",
                    type: "error",
                })
            }
        }
    }



    return (
        <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)} size="lg">
            <Dialog.Trigger w="full">
                {variant === "table" ? (
                    <Box minH="45px" w="full" display="flex" alignItems="center">
                        <IconButton size="sm" padding={2} variant="outline" aria-label="View Order"><Icon as={FaPenToSquare} /></IconButton>
                    </Box>
                ) : (
                    <Box minH="45px" w="full" display="flex" alignItems="end">
                        <Button w="full">View Order</Button>
                    </Box>
                )}
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content padding={4}>
                        <Dialog.Header>
                            <Dialog.Title fontSize="3xl" fontWeight="semibold">Order #{order.orderNumber.toString().padStart(4, '0')}</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <OrderManager order={order} onOrderChange={handleOrderChange} onStatusChange={handleStatusChange} />
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button onClick={handleSubmit}>Update Order</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
            <Toaster />
        </Dialog.Root>
    )
}