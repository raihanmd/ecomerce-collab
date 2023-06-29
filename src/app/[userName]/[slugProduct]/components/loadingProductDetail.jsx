"use client";

import { Flex, Box, Skeleton } from "@chakra-ui/react";

function LoadingProductDetail() {
  return (
    <Flex w={"full"}>
      <Flex gap={"2"} height={"5"}>
        <Skeleton width={"auto"}>
          <Box>Home</Box>
        </Skeleton>
        <Skeleton width={"4"}></Skeleton>
        <Skeleton width={"auto"}>
          <Box>Some long username</Box>
        </Skeleton>
        <Skeleton width={"4"}></Skeleton>
        <Skeleton width={"auto"}>
          <Box>Some very very long slug product name</Box>
        </Skeleton>
      </Flex>
    </Flex>
  );
}

export default LoadingProductDetail;
