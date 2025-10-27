import { api } from "@/convex/_generated/api";
import { Item, ItemCategories } from "@/utils/types";
import { Button, CloseButton, Dialog, Field, Input, Portal, Select, Text, Textarea, VStack, createListCollection } from "@chakra-ui/react";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { useForm } from "react-hook-form"
import CartItemList from "./CartItemList";



export default function CartModal() {

    const [open, setOpen] = useState<boolean>(false)
    const userCartItems = useQuery(api.cart.getUserCartItems)
    console.log(userCartItems)
    return (
        <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
            <Dialog.Trigger>
                <Button>Open Cart</Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Your Cart</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Text>Items in your cart</Text>
                            <CartItemList />
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
        </Dialog.Root>
    )
}