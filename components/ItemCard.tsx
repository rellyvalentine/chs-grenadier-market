import { Item } from "@/utils/types";
import { Button, Card, Image } from "@chakra-ui/react";



export default function ItemCard(props: { item: Item }) {
    return (
        <Card.Root>
            <Image />
            <Card.Body>
                <Card.Title>{props.item.name}</Card.Title>
                <Card.Description>{props.item.description}</Card.Description>
            </Card.Body>
            <Card.Footer>
                <Button>Add to Cart</Button>
                <Button>Donate Item</Button>
            </Card.Footer>
        </Card.Root>
    )
}