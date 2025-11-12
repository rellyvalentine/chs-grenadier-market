import { Dialog, Button, Portal, Text, VStack, Separator } from "@chakra-ui/react"
import { ReactNode } from "react"
import SignInWithGoogle from "./SignInWithGoogle"



type LoginTriggerProps = {
	children?: ReactNode
}

export default function LoginTrigger({ children }: LoginTriggerProps) {
    return (
        <Dialog.Root placement="center" size="sm" motionPreset="slide-in-bottom">
			<Dialog.Trigger asChild>
				{children ?? <Button>Login</Button>}
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content padding={4}>
                        <Dialog.Header>
                            <Dialog.Title w="full" textAlign="center">Sign In to Continue</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <VStack w="full" display="flex" justifyContent="center" gap={4}>
                                <Text fontWeight="normal" fontSize="md" textAlign="center">Students please sign in with your OCPS Google account</Text>
                                <Separator w="full" />
                                <SignInWithGoogle />
                            </VStack>
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}