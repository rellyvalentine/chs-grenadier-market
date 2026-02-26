import { api } from "@/convex/_generated/api"
import { Icon, IconButton, Menu, Text } from "@chakra-ui/react"
import { useQuery } from "convex/react"
import { FaUser } from "react-icons/fa"
import LoginTrigger from "./LoginTrigger"



export default function ProfileDropdown() {
    const user = useQuery(api.users.getCurrentUser)
    return (
        <Menu.Root>
            {user ? (
                <Menu.Trigger asChild>
                    <IconButton aria-label="Open Profile" variant="ghost" padding={2} borderRadius={4} color="secondary.950" _hover={{ bg: "#F4F4F6" }}>
                        <Text fontWeight="bold" fontSize="md">Profile</Text>
                        <Icon as={FaUser} />
                    </IconButton>
                </Menu.Trigger>
            ) : (
                <LoginTrigger>
                    <IconButton aria-label="Open Profile" variant="ghost" padding={2} borderRadius={4} color="secondary.950" _hover={{ bg: "#F4F4F6" }}>
                        <Text fontWeight="bold" fontSize="md">Profile</Text>
                        <Icon as={FaUser} />
                    </IconButton>
                </LoginTrigger>
            )}
        </Menu.Root>
    )
}