import { GridItem, Grid, Table, Input, Button, HStack } from "@chakra-ui/react";

const orders = [
    { id: 1, type: "donate", items: 2, user: "John Doe", name: "John Doe", lastUpdate: "2024-01-01", status: "pending" },
    { id: 2, type: "pickup", items: 1, user: "Jane Doe", name: "Jane Doe", lastUpdate: "2024-01-01", status: "fulfilled" },
    { id: 3, type: "donate", items: 3, user: "John Smith", name: "John Smith", lastUpdate: "2024-01-01", status: "cancelled" },
    { id: 4, type: "pickup", items: 4, user: "Jane Smith", name: "Jane Smith", lastUpdate: "2024-01-01", status: "pending" },
    { id: 5, type: "donate", items: 5, user: "John Doe", name: "John Doe", lastUpdate: "2024-01-01", status: "fulfilled" },
]

export default function OrderTable() {
    return (
        <Grid templateColumns="1fr auto" templateRows="auto auto" gap={4} border="1px solid" borderColor="gray.200" borderRadius="md">
            <GridItem colSpan={1}>
                <Input
                    placeholder="Search orders"
                    variant="outline"
                    borderColor="secondary.400"
                    borderRadius="md"
                    _focus={{ borderColor: "secondary.400" }}
                />
            </GridItem>
            <GridItem colSpan={1}>
                <HStack>
                    <Button
                        variant="outline"
                        borderColor="secondary.400"
                        borderRadius="md"
                        _focus={{ borderColor: "secondary.400" }}
                    >
                        Date Range
                    </Button>
                    <Button>Status</Button>
                    <Button>Sort By</Button>
                </HStack>
            </GridItem>
            <GridItem colSpan={2}>
                <Table.Root size="md" variant="outline">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>Order Id</Table.ColumnHeader>
                            <Table.ColumnHeader>Type</Table.ColumnHeader>
                            <Table.ColumnHeader>Items</Table.ColumnHeader>
                            <Table.ColumnHeader>User</Table.ColumnHeader>
                            <Table.ColumnHeader>Name</Table.ColumnHeader>
                            <Table.ColumnHeader>Last Update</Table.ColumnHeader>
                            <Table.ColumnHeader>Status</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {orders.map((order) => (
                            <Table.Row key={order.id}>
                                <Table.Cell>{order.id}</Table.Cell>
                                <Table.Cell>{order.type}</Table.Cell>
                                <Table.Cell>{order.items}</Table.Cell>
                                <Table.Cell>{order.user}</Table.Cell>
                                <Table.Cell>{order.name}</Table.Cell>
                                <Table.Cell>{order.lastUpdate}</Table.Cell>
                                <Table.Cell>{order.status}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </GridItem>
        </Grid>
    )
}