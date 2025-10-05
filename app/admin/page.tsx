"use client"

import { Button, Dialog, Grid, Portal, Skeleton, Text } from "@chakra-ui/react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api";
import CreateItemModal from "@/components/CreateItemModal";

export default function AdminPage() {


    const user = useQuery(api.users.getCurrentUser);
    console.log(user);

    return (
        <Skeleton loading={!user}>
            {user && user.role === "ADMIN" ? (
                <Grid>
                    <Text>Admin Page</Text>
                    <CreateItemModal />
                </Grid>
            ) : (
                <Grid>
                    <Text>You are not authorized to access this page</Text>
                </Grid>
            )}
        </Skeleton>
    )
}
