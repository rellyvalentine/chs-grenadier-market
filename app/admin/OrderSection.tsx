import OrderTable from "@/components/OrderTable";
import { Grid, GridItem, Heading, Table, VStack } from "@chakra-ui/react";



export default function OrderSection() {
    return (
        <VStack w="full">
            <Heading size="2xl">Orders</Heading>
            <Grid templateColumns="1fr 1fr" gap={12}>
                <GridItem>
                    <Heading>Upcoming Orders</Heading>
                </GridItem>
                <GridItem>
                    <Heading>Past Orders</Heading>
                    <OrderTable />
                </GridItem>
            </Grid>
        </VStack>
    )
}