"use client";

import ProductCard from "@/app/components/productCard";
import { Stack, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";

import color from "@/const/color";

export default function UserTab({ userPage }) {
  if (!userPage.userProduct) {
    return (
      <Stack w={"full"} h={"xl"} justify={"center"} align={"center"}>
        User ini belum memiliki toko
      </Stack>
    );
  }

  return (
    <Tabs position="relative" variant="unstyled">
      <TabList>
        <Tab fontWeight={"semibold"}>Products</Tab>
        <Tab fontWeight={"semibold"}>About</Tab>
      </TabList>
      <TabIndicator mt="-1.5px" height="3px" bg={`${color.MAIN_COLOR}.500`} borderRadius="1px" />
      <TabPanels>
        <TabPanel>
          <ProductCard products={userPage.userProduct} />
        </TabPanel>
        <TabPanel>
          <Text>{userPage.userShopDescription || "User shop description"}</Text>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
