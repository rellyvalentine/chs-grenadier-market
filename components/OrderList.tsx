import OrderCard from "./OrderCard";
import { Wrap, WrapItem, Text } from "@chakra-ui/react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function OrderList() {

    const upcomingOrders = useQuery(api.orders.getUpcomingOrders);

    return (
        (upcomingOrders && upcomingOrders.length > 0 ? (
            <Wrap gap={2}>
                {upcomingOrders.map((order) => (
                    <WrapItem key={order._id} display="flex" alignItems="start" justifyContent="center">
                        <OrderCard order={order} />
                    </WrapItem>
                ))}
            </Wrap>
        ) : (
            <Text>There are no upcoming orders</Text>
        ))
    )
}