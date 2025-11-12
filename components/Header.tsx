import { Heading, HStack, Text } from "@chakra-ui/react";
import CartModal from "./CartModal";
import ProfileDropdown from "./ProfileDropdown";


export default function Header() {
    
    return (
        <HStack width="full" padding={4} justify="space-between">
            <Heading size="2xl">Grenadier Market</Heading>
            <HStack>
                <CartModal />
                <ProfileDropdown />
            </HStack>
        </HStack>
    )
}