import { Item } from "@/utils/types";
import { HStack, VStack } from "@chakra-ui/react";
import { useState } from "react";



export default function ItemManager(props: { item: Item, onItemChange: (item: Item) => void }) {
    const { item, onItemChange } = props;
    const [name, setName] = useState(item.name)
    const [description, setDescription] = useState(item.description)
    const [category, setCategory] = useState(item.category)
    const [quantity, setQuantity] = useState(item.quantity)
    const [isActive, setIsActive] = useState(item.isActive)

    return (
        <VStack width="full" gap={4} alignItems="start">
            <HStack w="full" gap={12}>
                
            </HStack>
        </VStack>
    )
}