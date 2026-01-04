import { Grid, Heading, HStack, Image } from "@chakra-ui/react";
import CartModal from "./CartModal";
import ProfileDropdown from "./ProfileDropdown";


export default function Header() {

    return (
        <HStack bg="#FAFBFC" width="full" paddingX={4} paddingY={4} position="relative" borderBottom="1px solid" borderColor="secondary.100">
            <Grid templateColumns="1fr auto 1fr" alignItems="center" width="1400px" mx="auto">
                <HStack>
                    <Image src="/header_logo_img_3faibqhguoov3ombipa.png" alt="Grenadier Market Logo" width={250} />
                </HStack>

                <Heading textStyle="heading" color="primary.600">
                    Grenadier Market
                </Heading>

                <HStack justify="flex-end">
                    <CartModal />
                    <ProfileDropdown />
                </HStack>
            </Grid>
        </HStack>
    )
}