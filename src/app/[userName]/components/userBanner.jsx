"use client";

import { Flex, Heading, Stack, Box, Text, Avatar, Icon } from "@chakra-ui/react";
import { BsStarFill, BsDot } from "react-icons/bs";

import unslugify from "@/utils/unslugify";

export default function UserBanner({ userPage }) {
  return (
    <Flex py={"3"} w="full" alignItems="center" justifyContent="center">
      <Flex w={"full"} shadow="sm" rounded="md" direction="column" alignItems="center" justifyContent="center">
        <Box
          backgroundImage={`url(${userPage.userBanner || "https://firebasestorage.googleapis.com/v0/b/ecomerce-bc524.appspot.com/o/banner%2Fuser-default-banner.webp?alt=media&token=e93f15f3-8df9-4b59-b08a-b6b095815b16"})`}
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
        <Flex gridColumn="span 8" p={{ base: "4", md: "8" }} width="full" height="full" borderRadius="lg" textAlign="left" mt={{ base: "9", md: "6" }} direction={{ base: "column", sm: "row" }} gap={4}>
          <Flex direction={"column"} flex={"1"}>
            <Flex align={"center"}>
              <Heading fontSize={{ base: "lg", sm: "2xl", md: "4xl" }} fontWeight="bold" color="gray.800" display={"inline"}>
                {unslugify(userPage.userName)}
              </Heading>
              <Icon as={BsDot} boxSize={"7"} />
              <Text>
                {userPage.userCity}, {userPage.userProvince}
              </Text>
            </Flex>
            <Stack color="gray.800" direction={{ base: "column", md: "row" }}>
              <Text flex={"1"} fontSize={{ base: "md", sm: "lg" }} fontWeight="light" color="gray.800">
                {userPage.userBio || "Akun ini belum mempunyai bio."}
              </Text>
            </Stack>
          </Flex>
          <Flex direction={"column"} justify={"center"} align={"center"} transform={{ sm: `translateY(-15px)` }}>
            <Flex justify={"center"} textAlign={"center"} align={"center"} gap={"1"} dir={"row"}>
              <Icon as={BsStarFill} fontSize={"md"} color={"orange"} />
              <Heading>{userPage.totalRating || "0"}</Heading>
            </Flex>
            <Text>Rating & Reviews</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
