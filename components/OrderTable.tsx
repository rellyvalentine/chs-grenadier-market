import { GridItem, Grid, Table, Input, Button, HStack, Menu, IconButton, Text, Icon } from "@chakra-ui/react";
import { HiSortAscending, HiOutlineEye } from "react-icons/hi";
import DateRangeSelector from "./DateRangeSelector";
import { useState } from "react";

const orders = [
    { id: 1, type: "donate", items: 2, user: "student", name: "John Doe", date: 1715769600000, time: 100000, lastUpdate: "2024-01-01", status: "pending" },
    { id: 2, type: "pickup", items: 1, user: "parent", name: "Jane Doe", date: 1715769600000, time: 100000, lastUpdate: "2024-01-01", status: "fulfilled" },
    { id: 3, type: "donate", items: 3, user: "student", name: "John Smith", date: 1715769600000, time: 100000, lastUpdate: "2024-01-01", status: "cancelled" },
    { id: 4, type: "pickup", items: 4, user: "parent", name: "Jane Smith", date: 1715769600000, time: 100000, lastUpdate: "2024-01-01", status: "pending" },
    { id: 5, type: "donate", items: 5, user: "student", name: "John Doe", date: 1715769600000, time: 100000, lastUpdate: "2024-01-01", status: "fulfilled" },
]

export default function OrderTable() {

    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(null);

    const onChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    }

    // Filter orders by date range
    const filteredOrders = orders.filter((order) => {
        if (!startDate || !endDate) return true;
        const orderDate = new Date(order.date);
        return orderDate >= startDate && orderDate <= endDate;
    });

    return (
        <Grid w="full" templateColumns="1fr 1fr" templateRows="auto auto" border="1px solid" borderColor="gray.200" borderRadius="md">
            <GridItem colSpan={1} padding={2}>
                <Input placeholder="Search by Order Id or Name" variant="subtle" w="full" borderRadius="md" _focus={{ borderColor: "secondary.400" }}
                />
            </GridItem>
            <GridItem colSpan={1} padding={2}>
                <HStack w="full" justifyContent="end">
                    <DateRangeSelector startDate={startDate} endDate={endDate} onChange={onChange} />
                    <Menu.Root>
                        <Menu.Trigger>
                            <Button size="xs">Status</Button>
                        </Menu.Trigger>
                    </Menu.Root>
                    <Menu.Root>
                        <Menu.Trigger>
                            <Button size="xs">
                                <HiSortAscending /> Sort
                            </Button>
                        </Menu.Trigger>
                    </Menu.Root>
                </HStack>
            </GridItem>
            <GridItem colSpan={2}>
                <Table.Root size="md" variant="outline">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>Order Id</Table.ColumnHeader>
                            <Table.ColumnHeader>Name</Table.ColumnHeader>
                            <Table.ColumnHeader>User</Table.ColumnHeader>
                            <Table.ColumnHeader>Type</Table.ColumnHeader>
                            <Table.ColumnHeader>Scheduled Date</Table.ColumnHeader>
                            <Table.ColumnHeader>Scheduled Time</Table.ColumnHeader>
                            <Table.ColumnHeader>Items</Table.ColumnHeader>
                            <Table.ColumnHeader>Last Update</Table.ColumnHeader>
                            <Table.ColumnHeader>Status</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {orders.map((order) => (
                            <Table.Row key={order.id} fontWeight="medium">
                                <Table.Cell>#{order.id}</Table.Cell>
                                <Table.Cell>{order.name}</Table.Cell>
                                <Table.Cell>{order.user.charAt(0).toUpperCase() + order.user.slice(1)}</Table.Cell>
                                <Table.Cell>{order.type.charAt(0).toUpperCase() + order.type.slice(1)}</Table.Cell>
                                <Table.Cell>{new Date(order.date).toLocaleDateString()}</Table.Cell>
                                <Table.Cell>{new Date(order.time).toLocaleTimeString()}</Table.Cell>
                                <Table.Cell>
                                    <HStack>
                                        <IconButton as={HiOutlineEye} variant="ghost" size="2xs" />
                                        <Text>{order.items} Items</Text>
                                    </HStack>
                                </Table.Cell>
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