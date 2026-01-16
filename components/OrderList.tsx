import OrderCard from "./OrderCard";
import { Wrap, WrapItem } from "@chakra-ui/react";
import { Order } from "@/utils/types";

export default function OrderList() {

    const orders = [
        {
            _id: "1",
            userId: "1",
            orderType: "donate",
            date: 1715769600000,
            time: 100000,
            status: "pending",
            updatedAt: 1715769600000,
            updatedBy: "123",
        },
        {
            _id: "2",
            userId: "2",
            orderType: "pickup",
            date: 1715769600000,
            time: 100000,
            status: "pending",
            updatedAt: 1715769600000,
            updatedBy: "123",
        },
    ]

    return (
        <Wrap>
            {orders.map((order) => (
                <WrapItem key={order._id}>
                    <OrderCard order={order as Order} />
                </WrapItem>
            ))}
        </Wrap>
    );
}