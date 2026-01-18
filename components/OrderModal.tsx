import { Box, Button, CloseButton, Dialog, Icon, IconButton, Portal, Text } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster"
import { FaShoppingCart } from "react-icons/fa";
import { useCallback, useRef, useState } from "react";
import Cart from "./Cart";
import LoginTrigger from "./LoginTrigger";
import { useConvexAuth, useMutation } from "convex/react";
import { Order, OrderDraft } from "@/utils/types";
import { api } from "@/convex/_generated/api";



export default function OrderModal(props: { order: Order }) {
    const { order } = props;
    const [open, setOpen] = useState<boolean>(false)

    return (
        <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
            <Dialog.Trigger>
                <Box minH="45px" w="full" display="flex" alignItems="end">
                    <Button w="full">View Order</Button>
                </Box>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content maxW="1400px" padding={4}>
                        <Dialog.Header>
                            <Dialog.Title fontSize="3xl" fontWeight="semibold">Order#{order._id}</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button>Update Order Status</Button>
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