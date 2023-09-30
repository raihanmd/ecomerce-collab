"use client";

import Image from "next/image";
import Link from "next/link";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "next-auth/react";
import { VscAccount } from "react-icons/vsc";
import { MdOutlineVerified } from "react-icons/md";
import { LuSettings } from "react-icons/lu";
import { GrAddCircle } from "react-icons/gr";
import { SearchIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import { Box, Flex, Text, Button, Input, InputGroup, InputRightAddon, Menu, Avatar, MenuList, MenuItem, MenuDivider, MenuButton, Icon } from "@chakra-ui/react";

import logoBrand from "@/images/lynxshop.webp";
import DesktopNav from "./desktopNav";
import { useUserContext } from "@/context/UserContext";
import color from "@/const/color";

const searchProduct = (product) => {
  console.log(product);
};

export default function MyNavbar() {
  const user = useUserContext();

  const [isInputFocused, setInputFocused] = useState(false);
  const queryRef = useRef();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <Box boxShadow={"md"} position={"sticky"} top={"0"} zIndex={"100"}>
      <Flex bg={"white"} mx={"auto"} color={"white"} minH={"60px"} py={{ base: 4 }} px={{ base: 4, md: 20 }} borderBottom={1} borderStyle={"solid"} borderColor={"gray.200"} align={"center"}>
        <Flex justify={"space-between"} align={"center"} width={"full"} pr={4} gap={2}>
          <Link href={"/"}>
            <Image src={logoBrand} alt={"Logo brand"} width={40} height={40} />
          </Link>
          <Link href={"/"}>
            <Text textAlign={{ base: "center", md: "left" }} fontFamily={"heading"} color={"black"} display={{ base: "none", md: "inline" }} fontWeight={700}>
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
                <Button type={"submit"} size="sm" borderLeftRadius={0} borderRightRadius={3.3} background={isInputFocused ? "black" : "gray.200"} _hover={"none"}>
                  <SearchIcon color={"white"} />
                </Button>
              </InputRightAddon>
            </InputGroup>
          </form>
        </Flex>

        {user ? (
          <Menu>
            <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
              <Avatar size={"sm"} src={user.image} alt={`Picture of ${user.name}`} />
            </MenuButton>
            <MenuList color={"black"}>
              <MenuItem as={Link} href={user.city ? "/new-product" : "/verification"} _hover={{ background: `${color.MAIN_COLOR}.50` }} _focus={{ background: `${color.MAIN_COLOR}.50` }}>
                <Flex w={"full"} justify={"space-between"} align={"center"}>
                  {user.city ? "Add Product" : "Verify My Account"} <Icon fontSize={"lg"} as={user.city ? GrAddCircle : MdOutlineVerified} />
                </Flex>
              </MenuItem>
              {MENU_ITEM.map((item) => (
                <MenuItem key={item.key} as={Link} href={item.href} _hover={{ background: `${color.MAIN_COLOR}.50` }}>
                  <Flex w={"full"} justify={"space-between"} align={"center"}>
                    {item.label}
                    <Icon fontSize={"lg"} as={item.icon} />
                  </Flex>
                </MenuItem>
              ))}
              <MenuDivider />
              <MenuItem onClick={handleLogout} _hover={{ background: `${color.MAIN_COLOR}.50` }}>
                <Flex w={"full"} justify={"space-between"} align={"center"}>
                  Log out <Icon fontSize={"lg"} as={BiLogOut} />
                </Flex>
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button
            as={"a"}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"black"}
            href={"/api/auth/signin"}
            _hover={{
              bg: "gray.800",
            }}
          >
            Log In
          </Button>
        )}
      </Flex>
    </Box>
  );
}

const MENU_ITEM = [
  {
    key: 1,
    label: "My Account",
    icon: VscAccount,
    href: "/account",
  },
  {
    key: 2,
    label: "Setting",
    icon: LuSettings,
    href: "/setting",
  },
];
