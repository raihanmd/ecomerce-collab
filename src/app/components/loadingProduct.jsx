"use client";

import { Flex, Box, Image, Skeleton } from "@chakra-ui/react";

function LoadingProduct() {
  return (
    <Flex mt={"2"} w={"full"} justifyContent="center" direction={"row"} alignContent={"start"} flexWrap={"wrap"} gap={"2"} px={"2"}>
      {Array(24)
        .fill("")
        .map((_, i) => (
          <Box key={i} className={"card-product"}>
            <Box bg={"white"} w={{ base: "full", sm: "48" }} h={"auto"} rounded="sm" shadow="sm" position="relative">
              <Skeleton>
                <Image roundedTop="sm" w={"full"} h={"48"} objectFit={"cover"} />
              </Skeleton>
              <Box p={"2"}>
                <Flex direction={"column"} justifyContent="space-between" alignContent="center" gap={"2"} h={"5em"}>
                  <Flex direction={"column"} gap={"1"}>
                    <Skeleton h={"2.5"}></Skeleton>
                    <Skeleton h={"2.5"}></Skeleton>
                    <Skeleton h={"2.5"}></Skeleton>
                  </Flex>
                  <Flex justifyContent={"space-between"}>
                    <Skeleton w={"24"} h={"2"}></Skeleton>
                    <Skeleton w={"24"} h={"2"}></Skeleton>
                  </Flex>
                </Flex>
              </Box>
            </Box>
          </Box>
        ))}
    </Flex>
  );
}

export default LoadingProduct;
