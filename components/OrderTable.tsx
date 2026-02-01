import { GridItem, Grid, Table, Input, Button, HStack, Menu, IconButton, Text, Icon } from "@chakra-ui/react";
import { HiSortAscending, HiOutlineEye } from "react-icons/hi";
import DateRangeSelector from "./DateRangeSelector";
import { useEffect, useMemo, useState } from "react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { Order, User } from "@/utils/types";
import { FaPenToSquare } from "react-icons/fa6";
import OrderModal from "./OrderModal";

const MILLISECONDS_PER_SECOND = 1000
const SECONDS_PER_MINUTE = 60
const MINUTES_PER_HOUR = 60

function getStartDate() {
    const currentDate = new Date(Date.now()).getTime()
    const sevenDaysAgo = currentDate - 7 * 24 * MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND
    return sevenDaysAgo
}

function getEndDate() {
    const currentDate = new Date(Date.now()).getTime()
    const sevenDaysFromNow = currentDate + 7 * 24 * MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND
    return sevenDaysFromNow
}

export default function OrderTable() {

    const defaultStartDate = useMemo(() => new Date(getStartDate()), []);
    const defaultEndDate = useMemo(() => new Date(getEndDate()), []);

    const [startDate, setStartDate] = useState<Date | null>(defaultStartDate);
    const [endDate, setEndDate] = useState<Date | null>(defaultEndDate);

    const onChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;
        setStartDate(prev => prev?.getTime() === start?.getTime() ? prev : start);
        setEndDate(prev => prev?.getTime() === end?.getTime() ? prev : end);
    }

    const pastOrders = useQuery(api.orders.getPastOrders, { startDate: startDate?.getTime(), endDate: endDate?.getTime() }) || []
    // Memoize the user ids to avoid re-fetching the users for each order
    const userIds = useMemo(() => pastOrders.map((order) => order.userId), [pastOrders]);

    const users = useQuery(api.users.getUsers, { userIds: userIds }) || []
    
    const userMap = users.reduce<Record<Id<"users">, User>>((acc, user) => {
        acc[user._id] = user
        return acc
    }, {})


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
                            <Table.ColumnHeader>Last Update</Table.ColumnHeader>
                            <Table.ColumnHeader>Status</Table.ColumnHeader>
                            <Table.ColumnHeader>Actions</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {pastOrders?.map((order) => (
                            <Table.Row key={order._id} fontWeight="medium">
                                <Table.Cell>#{order.orderNumber.toString().padStart(4, '0')}</Table.Cell>
                                <Table.Cell>{userMap[order.userId]?.name}</Table.Cell>
                                <Table.Cell>{userMap[order.userId]?.role ? userMap[order.userId]?.role : "Unknown"}</Table.Cell>
                                <Table.Cell>{order.orderType.charAt(0).toUpperCase() + order.orderType.slice(1)}</Table.Cell>
                                <Table.Cell>{new Date(order.date).toLocaleDateString()}</Table.Cell>
                                <Table.Cell>{new Date(order.time).toLocaleTimeString()}</Table.Cell>
                                <Table.Cell>{new Date(order.updatedAt).toLocaleString()}</Table.Cell>
                                <Table.Cell>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</Table.Cell>
                                <Table.Cell><OrderModal order={order} variant="table" /></Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </GridItem>
        </Grid>
    )
}