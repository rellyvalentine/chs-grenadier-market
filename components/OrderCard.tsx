import { Order } from "@/utils/types";
import { Badge, Box, Button, Card, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import OrderModal from "./OrderModal";



export default function OrderCard(props: { order: Order }) {
    const { order } = props;
    return (
        <Card.Root transform="scale(0.85)" transformOrigin="top left" size="md" w="300px" borderColor="secondary.200" borderBottom="4px solid" borderBottomColor="secondary.200" borderRadius="xl" overflow="hidden">
            <Card.Header>
                <HStack justify="space-between" alignItems="start">
                    <VStack alignItems="start" w="full">
                        <HStack justify="space-between" w="full">
                            <Badge bg={order.orderType === "donate" ? "primary.500" : "secondary.900"} color="white" size="md" textTransform="uppercase">{order.orderType}</Badge>
                            <Text>Order #{order.orderNumber.toString().padStart(4, '0')}</Text>
                        </HStack>
                        <HStack>
                            <Badge bg="secondary.400" color="white" size="md" textTransform="uppercase">{order.status}</Badge>
                            {(order.status === "pending" && order.time < Date.now()) && <Badge bg="primary.400" color="white" size="md" textTransform="uppercase">past due</Badge> }
                        </HStack>
                    </VStack>
                </HStack>
            </Card.Header>
            <Card.Body color="fg.muted">
                <VStack w="full" alignItems="start" justifyContent="space-between">
                    <HStack justify="space-between" w="full">
                        <VStack gap={0} alignItems="start">
                            <Heading size="lg" fontWeight="500">{new Date(order.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</Heading>
                            <Heading size="2xl" fontWeight="700">{new Date(order.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</Heading>
                        </VStack>
                        {/* <Text fontSize="lg" fontWeight="medium">3 Items</Text> */}
                    </HStack>
                </VStack>
            </Card.Body>
            <Card.Footer>
                <OrderModal order={order} />
            </Card.Footer>
        </Card.Root>
    )
}