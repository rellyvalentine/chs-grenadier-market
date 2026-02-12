import { VStack, HStack, Heading, Button } from "@chakra-ui/react";
import InventoryTable from "./InventoryTable";
import ItemModal from "./ItemModal";




export default function InventorySection() {
    return (
        <VStack w="full" justifyContent="center" py={16} px={4}>
            <HStack w="full" justifyContent="space-between">
                <Heading>Inventory</Heading>
                <ItemModal item={null} variant="create" />
            </HStack>
            <InventoryTable />
        </VStack>
    )
}