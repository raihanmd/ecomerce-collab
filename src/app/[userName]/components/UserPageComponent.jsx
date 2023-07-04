"use client";

import unslugify from "@/utils/unslugify";
import { Flex, Heading, Stack, Box, Text, Avatar } from "@chakra-ui/react";

export default function UserPageComponent({ userPage }) {
  return (
    <Flex py={"3"} w="full" alignItems="center" justifyContent="center">
      <Flex w={"full"} shadow="sm" rounded="md" direction="column" alignItems="center" justifyContent="center">
        <Box
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1666795599746-0f62dfa29a07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          height={"full"}
          width={"full"}
          borderRadius={{ base: "none", md: "md" }}
          px={{ base: "4", md: "8" }}
          py={{ base: "16", md: "8" }}
          display="flex"
          alignItems="left"
        >
          <Avatar
            borderRadius="full"
            boxSize={{ base: "100px", md: "150px" }}
            shadow="lg"
            border="4px solid"
            mb={"-20"}
            transform={{ base: `translateY(30px)`, md: "none" }}
            src={userPage.userImage}
            alt={`Picture of ${userPage.userImage}`}
          />
        </Box>
        <Box gridColumn="span 8" p={{ base: "4", md: "8" }} width="full" height="full" borderRadius="lg" textAlign="left" py={"12"}>
          <Heading fontSize={{ base: "lg", md: "4xl" }} fontWeight="bold" color="gray.800">
            {unslugify(userPage.userName)}
          </Heading>
          <Stack color="gray.800">
            <Text fontSize={{ base: "md", md: "xl" }} fontWeight="light" color="gray.800">
              Photographer
            </Text>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
}
