import { Order, OrderItem } from "@/utils/types";
import { VStack } from "@chakra-ui/react";
import OrderItemEntry from "./OrderItemEntry";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";




export default function OrderItemList(props: { orderItems: OrderItem[], onOrderItemsChange: (orderItems: OrderItem[]) => void }) {
    const { orderItems, onOrderItemsChange } = props;
    
    return (
        <VStack>
            {orderItems.map((orderItem) => (
                <OrderItemEntry key={orderItem._id} orderItem={orderItem} onOrderItemChange={(orderItem) => onOrderItemsChange(orderItems.map((item) => item._id === orderItem._id ? orderItem : item))} />
            ))}
        </VStack>
    )
}