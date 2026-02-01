import { OrderItem } from "@/utils/types";
import { HStack, IconButton, Icon, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";




export default function OrderItemQuantity(props: { orderItem: OrderItem, onOrderItemChange: (orderItem: OrderItem) => void }) {
    const { orderItem, onOrderItemChange } = props;
    const [quantity, setQuantity] = useState(orderItem.quantity)
    const handleDecrement = () => {
        setQuantity(quantity - 1)
        onOrderItemChange({ ...orderItem, quantity: quantity - 1 })
    }
    const handleIncrement = () => {
        setQuantity(quantity + 1)
        onOrderItemChange({ ...orderItem, quantity: quantity + 1 })
    }
    return (
        <HStack>
            <IconButton size="sm" padding={2} variant="outline" onClick={handleDecrement}>
                <Icon as={FaMinus} />
            </IconButton>
            <Text fontSize="md" fontWeight="semibold">{quantity}</Text>
            <IconButton size="sm" padding={2} variant="outline" onClick={handleIncrement}>
                <Icon as={FaPlus} />
            </IconButton>
        </HStack>
    )
}