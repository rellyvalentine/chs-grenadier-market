import { Button, CloseButton, Dialog, Icon, IconButton, Portal, Text } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster"
import { FaShoppingCart } from "react-icons/fa";
import { useCallback, useRef, useState } from "react";
import Cart from "./Cart";
import LoginTrigger from "./LoginTrigger";
import { useConvexAuth, useMutation } from "convex/react";
import { OrderDraft } from "@/utils/types";
import { api } from "@/convex/_generated/api";



export default function CartModal() {

    const [open, setOpen] = useState<boolean>(false)

    const { isAuthenticated } = useConvexAuth()

    const draftRef = useRef<OrderDraft | null>(null)
    // The callback is used to update the draftRef within the Cart component without causing a re-render
    const handleDraftChange = useCallback((draft: OrderDraft) => {
        console.log("Draft Change", draft)
        draftRef.current = draft
    }, [])


    const createOrder = useMutation(api.orders.createOrder)
    const handleSubmit = async () => {
        if(draftRef.current) {

            // Check if there are any cart items
            if(draftRef.current.cartItems.length === 0) {
                console.log("No cart items")
                toaster.create({
                    title: "Please select an item for your order",
                    description: "You need to add cart items to submit an order",
                    type: "error",
                })
                return
            } else {
                // Check if at least one item is selected
                if(!draftRef.current.cartItems.some(item => item.selected)) {
                    console.log("No items are selected")
                    toaster.create({
                        title: "Please select an item for your order",
                        description: "You need to select at least one item to submit an order",
                        type: "error",
                    })
                    return
                }
            }

            // Check if a date and time are selected
            if(!draftRef.current.date || !draftRef.current.time) {
                console.log("No date or time")
                toaster.create({
                    title: "Please select a date and time",
                    description: "You need to select a date and time to submit an order",
                    type: "error",
                })
                return
            }

            const order = {
                orderType: draftRef.current.orderType,
                date: draftRef.current.date.getTime(),
                time: draftRef.current.time,
                cartItems: draftRef.current.cartItems.filter(item => item.selected),
            }
            console.log(order)

            const orderId = await createOrder(order)

            if(orderId) {
                toaster.create({
                    title: "Order created successfully",
                    description: "You can view your order in your profile",
                    type: "success",
                })
                setOpen(false)
            } else {
                toaster.create({
                    title: "Failed to create order",
                    description: "Please try again",
                    type: "error",
                })
            }
        }
        else {
            console.log("No draft")
            toaster.create({
                title: "Please select items to your order",
                description: "You need to add cart items to submit an order",
                type: "error",
            })
        }
    }

    return (
        <Dialog.Root  size="xl" open={open} onOpenChange={(e) => setOpen(e.open)}>
            {isAuthenticated ? (
                <Dialog.Trigger>
                    <IconButton aria-label="Open Cart" variant="ghost" padding={2} borderRadius={4} _hover={{ bg: "#EDEEF1" }}>
                        <Text fontWeight="bold" fontSize="md">Cart</Text>
                        <Icon as={FaShoppingCart} />
                    </IconButton>
                </Dialog.Trigger>
            ) : (
                <LoginTrigger>
                    <IconButton aria-label="Open Cart" variant="ghost" padding={2} borderRadius={4} _hover={{ bg: "#EDEEF1" }}>
                        <Text fontWeight="bold" fontSize="md">Cart</Text>
                        <Icon as={FaShoppingCart} />
                    </IconButton>
                </LoginTrigger>
            )}
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Your Cart</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Cart onOrderDraftChange={handleDraftChange} />
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button onClick={handleSubmit}>Confirm</Button>
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