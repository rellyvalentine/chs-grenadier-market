import { HStack, Table, Image, Text, Box, Skeleton } from "@chakra-ui/react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ItemModal from "./ItemModal";




export default function InventoryTable() {

    const items = useQuery(api.items.getItems);

    return (
        <Table.Root size="md" variant="outline">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader>Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Category</Table.ColumnHeader>
                    <Table.ColumnHeader>Quantity</Table.ColumnHeader>
                    <Table.ColumnHeader>Status</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {items?.map((item) => (
                    <Table.Row key={item._id}>
                        <Table.Cell>
                            <HStack gap={12}>
                                <Box flex="0 0 100px">
                                    {item.image ? (
                                        <Image src={item.image} alt={item.name} height="100px" />
                                    ) : (
                                        <Skeleton height="100px" width="100px" />
                                    )}
                                </Box>
                                <Text>{item.name}</Text>
                            </HStack>
                        </Table.Cell>
                        <Table.Cell>{item.category}</Table.Cell>
                        <Table.Cell>{item.quantity}</Table.Cell>
                        <Table.Cell>{item.isActive ? "Active" : "Inactive"}</Table.Cell>
                        <Table.Cell textAlign="end"><ItemModal item={item} variant="edit" /></Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    )
}