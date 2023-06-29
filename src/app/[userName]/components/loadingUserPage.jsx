"use client";

import { Flex, Box, Skeleton } from "@chakra-ui/react";

function LoadingUserPage() {
  return (
    <Flex w={"full"}>
      <Flex gap={"2"} height={"5"}>
        <Skeleton width={"auto"}>
          <Box>Home</Box>
        </Skeleton>
        <Skeleton width={"4"}></Skeleton>
        <Skeleton width={"auto"}>
          <Box>Some username</Box>
        </Skeleton>
      </Flex>
    </Flex>
  );
}

export default LoadingUserPage;
