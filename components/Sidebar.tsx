import { HStack, Link, VStack, Text, Icon, Image, Heading } from "@chakra-ui/react";
import { FaBoxOpen, FaChartColumn, FaClipboardCheck, FaGear, FaUserGroup } from "react-icons/fa6";




export default function Sidebar(props: { current: "orders" | "analytics" | "inventory" | "users" | "settings" | undefined }) {
    return (
        <VStack gap={8} p={4} h="full" w="full">
            <VStack alignItems="start" gap={1}>
                <HStack w="75%">
                    <Image src="/header_logo_img_small.png" alt="Grenadier Market Logo" width={50} />
                    <Heading textStyle="heading" color="primary.600" fontSize="xl" wordWrap="normal" overflowWrap="normal">Grenadier Market</Heading>
                </HStack>
                <Heading color="secondary.700" fontSize="xl" fontWeight="semibold">Admin Dashboard</Heading>
            </VStack>
            <VStack w="full" h="full" gap={3} alignItems="start" borderRadius={4}>
                <HStack w="full" gap={4} p={3} borderRadius={16} bg={props.current === "orders" ? "primary.100" : "auto"} border="2px solid" borderColor={props.current === "orders" ? "primary.400" : "transparent"} _hover={{ bg: props.current === "orders" ? "auto" : "#EDEEF1", cursor: "pointer" }}>
                    <Icon as={FaClipboardCheck} color={props.current === "orders" ? "primary.600" : "secondary.500"} size="lg" />
                    <Link href="/admin/orders" textDecoration="none" color={props.current === "orders" ? "primary.600" : "secondary.500"}>
                        <Text fontSize="md" fontWeight="700" lineHeight="25px" textTransform="uppercase">Orders</Text>
                    </Link>
                </HStack>
                <HStack w="full" gap={4} p={3} borderRadius={16} bg={props.current === "analytics" ? "primary.100" : "auto"} border="2px solid" borderColor={props.current === "analytics" ? "primary.400" : "transparent"} _hover={{ bg: props.current === "analytics" ? "auto" : "#EDEEF1", cursor: "pointer" }}>
                    <Icon as={FaChartColumn} color={props.current === "analytics" ? "primary.600" : "secondary.500"} size="lg" />
                    <Link href="/admin/analytics" textDecoration="none" color={props.current === "analytics" ? "primary.600" : "secondary.500"}>
                        <Text fontSize="md" fontWeight="700" lineHeight="25px" textTransform="uppercase">Analytics</Text>
                    </Link>
                </HStack>
                <HStack w="full" gap={4} p={3} borderRadius={16} bg={props.current === "inventory" ? "primary.100" : "auto"} border="2px solid" borderColor={props.current === "inventory" ? "primary.400" : "transparent"} _hover={{ bg: props.current === "inventory" ? "auto" : "#EDEEF1", cursor: "pointer" }}>
                    <Icon as={FaBoxOpen} color={props.current === "inventory" ? "primary.600" : "secondary.500"} size="lg" />
                    <Link href="/admin/inventory" textDecoration="none" color={props.current === "inventory" ? "primary.600" : "secondary.500"}>
                        <Text fontSize="md" fontWeight="700" lineHeight="25px" textTransform="uppercase">Inventory</Text>
                    </Link>
                </HStack>
                <HStack w="full" gap={4} p={3} borderRadius={16} bg={props.current === "users" ? "primary.100" : "auto"} border="2px solid" borderColor={props.current === "users" ? "primary.400" : "transparent"} _hover={{ bg: props.current === "users" ? "auto" : "#EDEEF1", cursor: "pointer" }}>
                    <Icon as={FaUserGroup} color={props.current === "users" ? "primary.600" : "secondary.500"} size="lg" />
                    <Link href="/admin/users" textDecoration="none" color={props.current === "users" ? "primary.600" : "secondary.500"}>
                        <Text fontSize="md" fontWeight="700" lineHeight="25px" textTransform="uppercase">Users</Text>
                    </Link>
                </HStack>
                    <HStack w="full" gap={4} p={3} borderRadius={16} bg={props.current === "settings" ? "primary.100" : "auto"} border="2px solid" borderColor={props.current === "settings" ? "primary.400" : "transparent"} _hover={{ bg: props.current === "settings" ? "auto" : "#EDEEF1", cursor: "pointer" }}>
                    <Icon as={FaGear} color={props.current === "settings" ? "primary.600" : "secondary.500"} size="lg" />
                    <Link href="/admin/settings" textDecoration="none" color={props.current === "settings" ? "primary.600" : "secondary.500"}>
                        <Text fontSize="md" fontWeight="700" lineHeight="25px" textTransform="uppercase">Settings</Text>
                    </Link>
                </HStack>
            </VStack>
        </VStack>
    )
}