import { HStack, Link, VStack, Text, Icon, Image, Heading } from "@chakra-ui/react";
import { FaBoxOpen, FaChartColumn, FaClipboardCheck, FaGear, FaUserGroup } from "react-icons/fa6";




export default function Sidebar(props: { current: string | undefined }) {
    return (
        <VStack gap={12} p={4} h="full" w="full">
            <VStack alignItems="start" gap={1}>
                <HStack w="75%">
                    <Image src="/header_logo_img_small.png" alt="Grenadier Market Logo" width={50} />
                    <Heading textStyle="heading" color="primary.600" fontSize="xl" wordWrap="normal" overflowWrap="normal">Grenadier Market</Heading>
                </HStack>
                <Heading color="secondary.700" fontSize="xl" fontWeight="semibold">Admin Dashboard</Heading>
            </VStack>
            <VStack w="full" h="full" gap={3} alignItems="start" borderRadius={4}>
                <HStack w="full" gap={4} p={3} borderRadius={12} bg="primary.100" border="2px solid" borderColor="primary.400" _hover={{ cursor: "pointer" }}>
                    <Icon as={FaClipboardCheck} color="primary.600" size="lg" />
                    <Link href="/admin/orders" color="primary.600">
                        <Text fontSize="md" fontWeight="semibold" textTransform="uppercase">Orders</Text>
                    </Link>
                </HStack>
                <HStack w="full" gap={4} p={3} borderRadius={12} bg={props.current === "orders" ? "primary.100" : "white"} _hover={{ bg: "#EDEEF1", cursor: "pointer" }}>
                    <Icon as={FaChartColumn} color="secondary.500" size="lg" />
                    <Link href="/admin/analytics" textDecoration="none" color="secondary.500">
                        <Text fontSize="md" fontWeight="semibold" textTransform="uppercase">Analytics</Text>
                    </Link>
                </HStack>
                <HStack w="full" gap={4} p={3} borderRadius={12} bg={props.current === "inventory" ? "primary.100" : "white"} _hover={{ bg: "#EDEEF1", cursor: "pointer" }}>
                    <Icon as={FaBoxOpen} color="secondary.500" size="lg" />
                    <Link href="/admin/inventory" textDecoration="none" color="secondary.500">
                        <Text fontSize="md" fontWeight="semibold" textTransform="uppercase">Inventory</Text>
                    </Link>
                </HStack>
                <HStack w="full" gap={4} p={3} borderRadius={12} bg={props.current === "users" ? "primary.100" : "white"} _hover={{ bg: "#EDEEF1", cursor: "pointer" }}>
                    <Icon as={FaUserGroup} color="secondary.500" size="lg" />
                    <Link href="/admin/users" textDecoration="none" color="secondary.500">
                        <Text fontSize="md" fontWeight="semibold" textTransform="uppercase">Users</Text>
                    </Link>
                </HStack>
                <HStack w="full" gap={4} p={3} borderRadius={12} bg={props.current === "settings" ? "primary.100" : "white"} _hover={{ bg: "#EDEEF1", cursor: "pointer" }}>
                    <Icon as={FaGear} color="secondary.500" size="lg" />
                    <Link href="/admin/settings" textDecoration="none" color="secondary.500">
                        <Text fontSize="md" fontWeight="semibold" textTransform="uppercase">Settings</Text>
                    </Link>
                </HStack>
            </VStack>
        </VStack>
    )
}