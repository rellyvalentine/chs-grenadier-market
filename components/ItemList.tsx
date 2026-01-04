import { Item } from "@/utils/types";
import { Wrap, WrapItem } from "@chakra-ui/react";
import ItemCard from "./ItemCard";



export default function ItemList(props: { items: Item[] | undefined }) {
    return (
        <Wrap justify="center" align="start" gap={4}>
            {props.items?.map((item) => (
                <WrapItem  display="flex" alignItems="start" justifyContent="center" key={item.name}>
                    <ItemCard item={item} />
                </WrapItem>
            ))}
        </Wrap>
    )
}