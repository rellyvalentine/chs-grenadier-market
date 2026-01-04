"use client";

import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import Link from "next/link";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { Grid, VStack, Text, GridItem, Box, Heading } from "@chakra-ui/react";
import ItemList from "@/components/ItemList";
import Header from "@/components/Header";
import FilterSelector from "@/components/FilterSelector";
import { Button } from "@/components/ui/button";

export default function Home() {

  const items = useQuery(api.items.getActiveItems)

  return (
    <VStack bg="#eeeeee" h="100vh" marginLeft="auto" marginRight="auto" gap={12}>
      <Header />
      <VStack maxWidth="1400px" gap={4}>
        <VStack gap={1}>
          <Heading size="2xl" textAlign="center">Welcome to the Grenadier Market</Heading>
          <Text textStyle="body" fontSize="lg" textAlign="center">The online marketplace where CHS students and parents can select available items they need or donate items they have to help others in need.</Text>
          <Text textStyle="body" fontSize="lg" textAlign="center">Add items to your cart and submit an order to pick them up or donate them to the school.</Text>
        </VStack>
        <VStack margin={8} gap={1}>
          <Text textStyle="body" fontSize="lg" textAlign="center" fontWeight="medium">Don't see an item you need or would like to donate?</Text>
          <Text textStyle="body" fontSize="lg" textAlign="center" fontWeight="medium">Submit a request to add it to the market.</Text>
          <Button variant="solid">Request Item</Button>
        </VStack>
        <Grid templateColumns="1fr auto 1fr" alignItems="start" width="full">
          <GridItem>
            <Box width="full" display="flex" alignItems="start" p={8}>
              <FilterSelector />
            </Box>
          </GridItem>
          <GridItem>
            <Box width="full" display="flex" alignItems="start" paddingY={8} paddingX={12}>
              <ItemList items={items} />
            </Box>
            <GridItem /> {/* Empty grid item to push the filter selector to the left */}
          </GridItem>
        </Grid>
      </VStack>
    </VStack>
  )
}

function SignOutButton() {
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();
  const router = useRouter();
  return (
    <>
      {isAuthenticated && (
        <button
          className="bg-slate-200 dark:bg-slate-800 text-foreground rounded-md px-2 py-1"
          onClick={() =>
            void signOut().then(() => {
              router.push("/signin");
            })
          }
        >
          Sign out
        </button>
      )}
    </>
  );
}

function Content() {
  const { viewer, numbers } =
    useQuery(api.myFunctions.listNumbers, {
      count: 10,
    }) ?? {};
  const addNumber = useMutation(api.myFunctions.addNumber);

  if (viewer === undefined || numbers === undefined) {
    return (
      <div className="mx-auto">
        <p>loading... (consider a loading skeleton)</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-lg mx-auto">
      <p>Welcome {viewer ?? "Anonymous"}!</p>
      <p>
        Click the button below and open this page in another window - this data
        is persisted in the Convex cloud database!
      </p>
      <p>
        <button
          className="bg-foreground text-background text-sm px-4 py-2 rounded-md"
          onClick={() => {
            void addNumber({ value: Math.floor(Math.random() * 10) });
          }}
        >
          Add a random number
        </button>
      </p>
      <p>
        Numbers:{" "}
        {numbers?.length === 0
          ? "Click the button!"
          : (numbers?.join(", ") ?? "...")}
      </p>
      <p>
        Edit{" "}
        <code className="text-sm font-bold font-mono bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded-md">
          convex/myFunctions.ts
        </code>{" "}
        to change your backend
      </p>
      <p>
        Edit{" "}
        <code className="text-sm font-bold font-mono bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded-md">
          app/page.tsx
        </code>{" "}
        to change your frontend
      </p>
      <p>
        See the{" "}
        <Link href="/server" className="underline hover:no-underline">
          /server route
        </Link>{" "}
        for an example of loading data in a server component
      </p>
      <div className="flex flex-col">
        <p className="text-lg font-bold">Useful resources:</p>
        <div className="flex gap-2">
          <div className="flex flex-col gap-2 w-1/2">
            <ResourceCard
              title="Convex docs"
              description="Read comprehensive documentation for all Convex features."
              href="https://docs.convex.dev/home"
            />
            <ResourceCard
              title="Stack articles"
              description="Learn about best practices, use cases, and more from a growing
            collection of articles, videos, and walkthroughs."
              href="https://www.typescriptlang.org/docs/handbook/2/basic-types.html"
            />
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <ResourceCard
              title="Templates"
              description="Browse our collection of templates to get started quickly."
              href="https://www.convex.dev/templates"
            />
            <ResourceCard
              title="Discord"
              description="Join our developer community to ask questions, trade tips & tricks,
            and show off your projects."
              href="https://www.convex.dev/community"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ResourceCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <div className="flex flex-col gap-2 bg-slate-200 dark:bg-slate-800 p-4 rounded-md h-28 overflow-auto">
      <a href={href} className="text-sm underline hover:no-underline">
        {title}
      </a>
      <p className="text-xs">{description}</p>
    </div>
  );
}
