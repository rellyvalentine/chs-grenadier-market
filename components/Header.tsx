import { Heading, HStack, Text } from "@chakra-ui/react";
import CartModal from "./CartModal";



export default function Header() {
    
    return (
        <HStack width="full" padding={4} justify="space-between">
            <Heading size="2xl">Grenadier Market</Heading>
            <CartModal />
        </HStack>
    )
}