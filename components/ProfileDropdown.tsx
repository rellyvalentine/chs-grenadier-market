import { api } from "@/convex/_generated/api"
import { Icon, IconButton, Menu } from "@chakra-ui/react"
import { useQuery } from "convex/react"
import { FaUser } from "react-icons/fa"
import LoginTrigger from "./LoginTrigger"



export default function ProfileDropdown() {
    const user = useQuery(api.users.getCurrentUser)
    return (
        <Menu.Root>
            {user ? (
                <Menu.Trigger>
                    <IconButton aria-label="Open Profile" variant="ghost">
                        <Icon as={FaUser} />
                    </IconButton>
                </Menu.Trigger>
            ) : (
                <LoginTrigger>
                    <IconButton aria-label="Open Profile" variant="ghost">
                        <Icon as={FaUser} />
                    </IconButton>
                </LoginTrigger>
            )}
        </Menu.Root>
    )
}