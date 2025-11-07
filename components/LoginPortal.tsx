import { Dialog, Portal } from "@chakra-ui/react";



export default function LoginPortal() {
    return (
        <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content>
                    <Dialog.Header>
                        <Dialog.Title>Login</Dialog.Title>
                    </Dialog.Header>
                </Dialog.Content>
            </Dialog.Positioner>
        </Portal>
    )
}