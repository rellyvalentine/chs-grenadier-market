import { Item, ItemCategories, ItemStatus } from "@/utils/types";
import { Box, Button, CloseButton, Dialog, Icon, Portal, IconButton, createListCollection, Select, Input, Field, VStack, Textarea, HStack, Image, Text, FileUpload } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { useCallback, useEffect, useRef, useState } from "react";
import { Toaster, toaster } from "@/components/ui/toaster"
import { useForm } from "react-hook-form";
import { FaPenToSquare } from "react-icons/fa6";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { fromByteArray } from "base64-js";
import { LuFileImage } from "react-icons/lu";
import { FaInfoCircle } from "react-icons/fa";




export default function ItemModal(props: { item: Item | null, variant: "edit" | "create" }) {
    const { item, variant } = props;
    const [open, setOpen] = useState<boolean>(false)
    const [itemImage, setItemImage] = useState<File | null>(null)
    const [previewImage, setPreviewImage] = useState<string | null>()

    const { register, handleSubmit, reset } = useForm<Item>(item ? { defaultValues: item } : undefined)

    const itemCategoriesCollection = createListCollection({
        items: Object.values(ItemCategories)
    })

    const itemStatusCollection = createListCollection({
        items: Object.values(ItemStatus)
    })

    useEffect(() => {
        if (item) {
            console.log(item.image)
            setPreviewImage(item.image)
        }
    }, [item])

    const handleItemImageChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const buffer = await file.arrayBuffer()
            const imgString = fromByteArray(new Uint8Array(buffer))
            setPreviewImage(`data:${file.type};base64,${imgString}`)
            setItemImage(file)
        }
    }, [])

    const generateUploadUrl = useMutation(api.items.generateUploadUrl)
    const createItem = useMutation(api.items.createItem)
    const updateItem = useMutation(api.items.updateItem)

    const onSubmit = async (data: Item,) => {

        if (variant === "create") {
            if (itemImage && itemImage instanceof File) {
                const uploadUrl = await generateUploadUrl()
                const result = await fetch(uploadUrl, {
                    method: "POST",
                    headers: { "Content-Type": itemImage.type },
                    body: itemImage,
                })
                const { storageId } = await result.json()
                const itemId = await createItem({
                    name: data.name,
                    description: data.description,
                    category: data.category,
                    quantity: Number(data.quantity),
                    image: storageId,
                    limit: Number(data.limit),
                })

                if (itemId) {
                    toaster.create({
                        title: "Item created successfully",
                        description: "The item has been created successfully",
                        type: "success",
                    })
                    setOpen(false)
                }
                else {
                    toaster.create({
                        title: "Failed to create item",
                        description: "The item was not created successfully",
                        type: "error",
                    })
                }

            } else {
                console.error("No item image provided")
            }
        }
        else if (variant === "edit") {
            if (item) {
                let imageId
                if (itemImage && itemImage instanceof File) {
                    const uploadUrl = await generateUploadUrl()
                    const result = await fetch(uploadUrl, {
                        method: "POST",
                        headers: { "Content-Type": itemImage.type },
                        body: itemImage,
                    })
                    const { storageId } = await result.json()
                    imageId = storageId
                }

                const itemId = await updateItem({
                    id: item._id,
                    name: data.name,
                    description: data.description,
                    category: data.category,
                    quantity: Number(data.quantity),
                    isActive: data.isActive,
                    image: imageId,
                    limit: Number(data.limit),
                })
                if (itemId) {
                    toaster.create({
                        title: "Item updated successfully",
                        description: "The item has been updated successfully",
                        type: "success",
                    })
                    setOpen(false)
                }
                else {
                    toaster.create({
                        title: "Failed to update item",
                        description: "The item was not updated successfully",
                        type: "error",
                    })
                }
            }
        }
    }

    return (
        <Dialog.Root open={open} onOpenChange={(e) => { setOpen(e.open); reset(); e.open ? setPreviewImage(item ? item.image : null) : setPreviewImage(null) }} size="lg">
            <Dialog.Trigger asChild>
                {variant === "edit" ? (
                    <Box minH="45px" display="flex" alignItems="center">
                        <IconButton size="sm" padding={2} variant="outline" aria-label="Edit Item"><Icon as={FaPenToSquare} /></IconButton>
                    </Box>
                ) : (
                    <Box minH="45px" display="flex" alignItems="end">
                        <Button w="full">Create Item</Button>
                    </Box>
                )}
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content padding={4}>
                        <Dialog.Header>
                            <Dialog.Title fontSize="3xl" fontWeight="semibold">{variant === "edit" ? "Edit Item" : "Create Item"}</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <form id="create-item-form" onSubmit={handleSubmit(onSubmit)}>
                                <VStack w="full" gap={4}>
                                    <HStack w="full" justifyContent="space-between">
                                        <Field.Root>
                                            <Field.Label fontSize="md" fontWeight="medium">Item name</Field.Label>
                                            <Input {...register("name")} placeholder="Enter item name" />
                                        </Field.Root>

                                        <Field.Root>
                                            <Field.Label fontSize="md" fontWeight="medium">Item category</Field.Label>
                                            <Select.Root collection={itemCategoriesCollection} {...register("category")} defaultValue={item ? [item.category] : undefined}>
                                                <Select.HiddenSelect />
                                                <Select.Control>
                                                    <Select.Trigger>
                                                        <Select.ValueText placeholder="Select category" />
                                                    </Select.Trigger>
                                                    <Select.IndicatorGroup>
                                                        <Select.Indicator />
                                                    </Select.IndicatorGroup>
                                                </Select.Control>
                                                <Select.Positioner>
                                                    <Select.Content>
                                                        {itemCategoriesCollection.items.map((category) => (
                                                            <Select.Item item={category} key={category}>
                                                                {category}
                                                                <Select.ItemIndicator />
                                                            </Select.Item>
                                                        ))}
                                                    </Select.Content>
                                                </Select.Positioner>
                                            </Select.Root>
                                        </Field.Root>
                                    </HStack>

                                    <HStack w="full">
                                        <Field.Root>
                                            <Field.Label fontSize="md" fontWeight="medium">Item description</Field.Label>
                                            <Textarea {...register("description")} placeholder="Enter item description" resize="none" />
                                        </Field.Root>
                                        <Field.Root>
                                            <Field.Label fontSize="md" fontWeight="medium">Item status</Field.Label>
                                            <Select.Root collection={itemStatusCollection} {...register("isActive", {setValueAs: (value) => value === "Active" ? true : false})} defaultValue={item ? [item.isActive ? ItemStatus.ACTIVE : ItemStatus.INACTIVE] : undefined}>
                                                <Select.HiddenSelect />
                                                <Select.Control>
                                                    <Select.Trigger>
                                                        <Select.ValueText placeholder="Select status" />
                                                    </Select.Trigger>
                                                    <Select.IndicatorGroup>
                                                        <Select.Indicator />
                                                    </Select.IndicatorGroup>
                                                </Select.Control>
                                                <Select.Positioner>
                                                    <Select.Content>
                                                        {itemStatusCollection.items.map((status) => (
                                                            <Select.Item item={status} key={status}>
                                                                {status}
                                                            </Select.Item>
                                                        ))}
                                                    </Select.Content>
                                                </Select.Positioner>
                                            </Select.Root>
                                        </Field.Root>
                                    </HStack>

                                    <HStack w="full">
                                        <Field.Root>
                                            <Field.Label fontSize="md" fontWeight="medium">Item quantity</Field.Label>
                                            <Input type="number" {...register("quantity")} defaultValue={item ? item.quantity : 0} placeholder="Enter item quantity" />
                                        </Field.Root>
                                        <Field.Root>
                                            <HStack w="full">
                                                <Field.Label fontSize="md" fontWeight="medium">Item limit</Field.Label>
                                                <Tooltip content="The maximum number that can be picked up per order" showArrow positioning={{ placement: "right-end" }}>
                                                    <Icon color="gray.500" as={FaInfoCircle} />
                                                </Tooltip>
                                            </HStack>
                                            <Input type="number" {...register("limit")} defaultValue={item ? item.limit : 0} placeholder="Enter item limit" />
                                        </Field.Root>
                                    </HStack>

                                    <HStack w="full">
                                        <Box>
                                            <Field.Root>
                                                <Field.Label fontSize="md" fontWeight="medium">Item image</Field.Label>
                                                <FileUpload.Root accept="image/*" onChange={handleItemImageChange} >
                                                    <FileUpload.HiddenInput />
                                                    <FileUpload.Trigger asChild>
                                                        <Box minH="45px" w="full" display="flex" alignItems="center">
                                                            <Button variant="outline" size="sm">
                                                                <Icon as={LuFileImage} /> Upload image</Button>
                                                        </Box>
                                                    </FileUpload.Trigger>
                                                </FileUpload.Root>
                                            </Field.Root>
                                        </Box>
                                        <Box display="flex" alignItems="center" justifyContent="center" w="200px" h="200px" border="1px solid" borderColor="gray.200" borderRadius="md" overflow="hidden">
                                            {previewImage ? <Image src={previewImage} alt="Item image" width={200} height={200} objectFit="cover" /> : <Text fontSize="sm" color="gray.500">No image selected</Text>}
                                        </Box>
                                    </HStack>
                                </VStack>
                            </form>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button type="submit" form="create-item-form">{variant === "edit" ? "Update Item" : "Create Item"}</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
            <Toaster />
        </Dialog.Root>
    )
}