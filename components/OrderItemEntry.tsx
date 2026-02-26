import { OrderItem } from "@/utils/types";
import { VStack, Text, Box, Checkbox, Grid, GridItem, HStack, Image, Skeleton } from "@chakra-ui/react";
import CartItemQuantity from "./CartItemQuantity";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import OrderItemQuantity from "./OrderItemQuantity";



export default function OrderItemEntry(props: { orderItem: OrderItem, onOrderItemChange: (orderItem: OrderItem) => void }) {
    const { orderItem, onOrderItemChange } = props;
    const item = useQuery(api.items.getItem, { id: orderItem.itemId });
    return (
        <Grid templateColumns="1fr auto 1fr" gap={4}>
            <GridItem display="flex" alignItems="center">
                <HStack>
                    <Box>
                        <Text fontSize="md" fontWeight="medium">{item?.name}</Text>
                    </Box>
                </HStack>
            </GridItem>

            <GridItem display="flex" alignItems="center">
                <Box flex="0 0 100px">
                    {item?.image ? (
                        <Image src={item.image} alt={item.name} width={100} height={100} />
                    ) : (
                        <Skeleton width={100} height={100} />
                    )}
                </Box>
            </GridItem>

            <GridItem display="flex" alignItems="center">
                <Box>
                    <OrderItemQuantity orderItem={orderItem} onOrderItemChange={onOrderItemChange} />
                </Box>
            </GridItem>
        </Grid>
    )
}