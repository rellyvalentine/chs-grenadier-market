import { api } from "@/convex/_generated/api";
import { Button, CloseButton, Dialog, Field, HStack, Icon, IconButton, Input, Portal, Select, Text, VStack, } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import Cart from "./Cart";
import { useQuery } from "convex/react";
import LoginPortal from "./LoginPortal";



export default function CartModal() {

    const [open, setOpen] = useState<boolean>(false)

    const user = useQuery(api.users.getCurrentUser)
    
    return (
        <Dialog.Root size="xl" open={open} onOpenChange={(e) => setOpen(e.open)}>
            <Dialog.Trigger>
                <IconButton aria-label="Open Cart" variant="ghost">
                    <Icon as={FaShoppingCart} />
                </IconButton>
            </Dialog.Trigger>
            {user ? (
                <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Your Cart</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Cart />
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button>Confirm</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
            ) : (
                <LoginPortal />
            )}
        </Dialog.Root>
    )
}