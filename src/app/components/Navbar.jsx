"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Box, Flex, Text, Button, Stack, Input, InputGroup, InputRightAddon } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import color from "@/const/color";
import logoBrand from "@/images/lynxshop.webp";
import DesktopNav from "./desktopNav";

const searchProduct = (product) => {
  console.log(product);
};

export default function Navbar() {
  const [isInputFocused, setInputFocused] = useState(false);
  const queryRef = useRef();

  return (
    <Box boxShadow={"md"}>
      <Flex bg={"white"} mx={"auto"} color={"white"} minH={"60px"} py={{ base: 4 }} px={{ base: 4, md: 20 }} borderBottom={1} borderStyle={"solid"} borderColor={"gray.200"} align={"center"}>
        <Flex justify={{ base: "center", md: "start" }} align={"center"} width={"full"} px={4} gap={2}>
          <Link href={"/"}>
            <Image src={logoBrand} alt={"Logo brand"} width={40} height={40} />
          </Link>
          <Link href={"/"}>
            <Text textAlign={{ base: "center", md: "left" }} fontFamily={"heading"} color={color.MAIN_COLOR} display={{ base: "none", md: "inline" }} fontWeight={700}>
              LynxShop
            </Text>
          </Link>

          <Flex display={{ base: "none", md: "flex" }} px={2}>
            <DesktopNav />
          </Flex>

          <form
            style={{ width: "100%" }}
            onSubmit={(e) => {
              e.preventDefault();
              searchProduct(queryRef.current.value);
            }}
          >
            <InputGroup size="sm">
              <Input
                ref={queryRef}
                color={"black"}
                width={"full"}
                size={"sm"}
                rounded={"md"}
                focusBorderColor={"none"}
                placeholder="Search products..."
                _focus={{ border: "2px solid black", borderRight: "none" }}
                _hover={"none"}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
              />
              <InputRightAddon p={0} border="none" rounded={"md"}>
                <Button type={"submit"} size="sm" borderLeftRadius={0} borderRightRadius={3.3} background={isInputFocused ? color.MAIN_COLOR : "gray.200"} _hover={"none"}>
                  <SearchIcon color={"white"} />
                </Button>
              </InputRightAddon>
            </InputGroup>
          </form>
        </Flex>

        <Stack flex={{ base: 1, md: 0 }} justify={"flex-end"} direction={"row"} spacing={6}>
          <Button as={"a"} fontSize={"sm"} fontWeight={400} variant={"link"} href={"#"}>
            Sign In
          </Button>
          <Button
            as={"a"}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={color.MAIN_COLOR}
            href={"#"}
            _hover={{
              bg: "gray.900",
            }}
          >
            Sign Up
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
}
