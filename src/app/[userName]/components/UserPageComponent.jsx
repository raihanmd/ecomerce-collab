"use client";

import unslugify from "@/utils/unslugify";
import { Flex, Heading, Stack, Box, Text, Avatar, Icon } from "@chakra-ui/react";
import { BsStarFill } from "react-icons/bs";

export default function UserPageComponent({ userPage }) {
  return (
    <Flex py={"3"} w="full" alignItems="center" justifyContent="center">
      <Flex w={"full"} shadow="sm" rounded="md" direction="column" alignItems="center" justifyContent="center">
        <Box
          backgroundImage={`url(${userPage.userBanner || "https://images.unsplash.com/photo-1666795599746-0f62dfa29a07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"})`}
          backgroundSize={"cover"}
          backgroundPosition={"center"}
          backgroundRepeat={"no-repeat"}
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
        <Flex gridColumn="span 8" p={{ base: "4", md: "8" }} width="full" height="full" borderRadius="lg" textAlign="left" mt={{ base: "9", md: "6" }} direction={{ base: "column", sm: "row" }}>
          <Flex direction={"column"} flex={"1"}>
            <Heading fontSize={{ base: "lg", sm: "2xl", md: "4xl" }} fontWeight="bold" color="gray.800">
              {unslugify(userPage.userName)}
            </Heading>
            <Stack color="gray.800" direction={{ base: "column", md: "row" }}>
              <Text flex={"1"} fontSize={{ base: "md", sm: "lg", md: "xl" }} fontWeight="light" color="gray.800">
                {userPage.userBio || "Akun ini belum mempunyai bio."}
              </Text>
            </Stack>
          </Flex>
          <Flex direction={"column"} justify={"center"} align={"center"} transform={{ sm: `translateY(-15px)` }}>
            <Flex justify={"center"} textAlign={"center"} align={"center"} gap={"1"} dir={"row"}>
              <Icon as={BsStarFill} fontSize={"md"} color={"orange"} />
              <Heading>{userPage.totalRating || "0"}</Heading>
            </Flex>
            <Text>Rating & Ulasan</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
