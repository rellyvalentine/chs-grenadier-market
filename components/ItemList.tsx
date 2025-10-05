import { Item } from "@/utils/types";
import { Wrap, WrapItem } from "@chakra-ui/react";
import ItemCard from "./ItemCard";



export default function ItemList(props: { items: Item[] | undefined }) {
    return (
        <Wrap justify="center" gap={8} p="10px">
            {props.items?.map((item) => (
                <WrapItem key={item.name}>
                    <ItemCard item={item} />
                </WrapItem>
            ))}
        </Wrap>
    )
}