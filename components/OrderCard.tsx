import { Order } from "@/utils/types";
import { Badge, Box, Button, Card, Heading, HStack, Text, VStack } from "@chakra-ui/react";



export default function OrderCard(props: { order: Order }) {
    const { order } = props;
    return (
        <Card.Root size="md" w="300px" borderColor="secondary.200" borderBottom="4px solid" borderBottomColor="secondary.200" borderRadius="xl">
            <Card.Header>
                <HStack justify="space-between" alignItems="start">
                    <VStack alignItems="start">
                        <Badge bg={order.orderType === "donate" ? "primary.500" : "secondary.900"} color="white" size="md" textTransform="uppercase">{order.orderType}</Badge>
                        <Badge bg="secondary.400" color="white" size="md" textTransform="uppercase">{order.status}</Badge>
                    </VStack>
                    <Text>Order#{order._id}</Text>
                </HStack>
            </Card.Header>
            <Card.Body color="fg.muted">
                <VStack w="full" alignItems="start" justifyContent="space-between">
                    <HStack justify="space-between" w="full">
                        <VStack gap={0} alignItems="start">
                            <Heading size="lg" fontWeight="medium">{new Date(order.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</Heading>
                            <Heading size="xl" fontWeight="medium">{new Date(order.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</Heading>
                        </VStack>
                        {/* <Text fontSize="lg" fontWeight="medium">3 Items</Text> */}
                    </HStack>
                    <Box minH="45px" w="full">
                        <Button w="full">View Order</Button>
                    </Box>
                </VStack>
            </Card.Body>
        </Card.Root>
    )
}