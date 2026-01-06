"use client"

import { Button, Dialog, Grid, Portal, Skeleton, Text, VStack } from "@chakra-ui/react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api";
import CreateItemModal from "@/components/CreateItemModal";
import Header from "@/components/Header";
import OrderSection from "./OrderSection";

export default function AdminPage() {


    const user = useQuery(api.users.getCurrentUser);
    console.log(user);

    return (
        <Skeleton loading={!user}>
            {user && user.role === "ADMIN" ? (
                <VStack marginLeft="auto" marginRight="auto" gap={12} paddingBottom={36}>
                    {/* TODO: Change to an admin header */}
                    <Header /> 
                    <VStack maxWidth="1400px" gap={8}>
                        <OrderSection />
                    </VStack>
                </VStack>   
            ) : (
                <Grid>
                    <Text>You are not authorized to access this page</Text>
                </Grid>
            )}
        </Skeleton>
    )
}
