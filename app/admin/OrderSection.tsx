import OrderList from "@/components/OrderList";
import OrderTable from "@/components/OrderTable";
import { Grid, GridItem, Heading, Table, VStack } from "@chakra-ui/react";



export default function OrderSection() {
    return (
        <VStack justifyContent="center" w="full" gap={12}  bg="white" borderRadius={4} p={4}>
            <VStack alignItems="start" w="full" gap={4}>
                <Heading>Upcoming Orders</Heading>
                <OrderList />
            </VStack>
            <VStack alignItems="start" w="full" gap={4}>
                <Heading>Past Orders</Heading>
                <OrderTable />
            </VStack>
        </VStack>
    )
}