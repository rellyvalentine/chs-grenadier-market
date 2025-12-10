import { Button, CloseButton, Dialog, Field, HStack, Icon, IconButton, Input, Portal, Select, Text, VStack, } from "@chakra-ui/react";
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
        draftRef.current = draft
    }, [])


    const createOrder = useMutation(api.orders.createOrder)
    const handleSubmit = async () => {
        console.log(draftRef.current)
        if(draftRef.current) {
            const orderId = await createOrder({
                orderType: draftRef.current.orderType,
                date: draftRef.current.date.getTime(),
                time: draftRef.current.time,
                cartItems: draftRef.current.cartItems,
            })
        }
    }

    return (
        <Dialog.Root  size="xl" open={open} onOpenChange={(e) => setOpen(e.open)}>
            {isAuthenticated ? (
                <Dialog.Trigger>
                    <IconButton aria-label="Open Cart" variant="ghost">
                        <Icon as={FaShoppingCart} />
                    </IconButton>
                </Dialog.Trigger>
            ) : (
                <LoginTrigger>
                    <IconButton aria-label="Open Cart" variant="ghost">
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
        </Dialog.Root>
    )
}