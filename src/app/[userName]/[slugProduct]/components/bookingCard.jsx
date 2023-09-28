"use client";

import { Button, Flex, Heading, Image, Input, Stack, Text } from "@chakra-ui/react";
import toRupiah from "@develoka/angka-rupiah-js";

import color from "@/const/color";
import { BsHeart } from "react-icons/bs";

export default function BookingCard({ product, quantity, handleQuantityChange, handleIncrement, handleDecrement }) {
  return (
    <Stack maxW="72" h={"full"} position="sticky" top={20} border="1px" borderColor={"gray.300"} p={3} rounded="md" spacing={"3"} display={{ base: "none", lg: "flex" }}>
      <Heading w={"full"} fontSize="lg">
        Set the booking amount
      </Heading>
      <Flex w={"60"} align={"center"} gap={2} maxW={"64"}>
        <Image rounded="md" alt={`product of ${product.productName}`} src={product.productImage} fit="cover" align="center" w="40px" h="40px" />
        <Heading fontSize="sm" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" w="full">
          {product.productName}
        </Heading>
      </Flex>
      <Flex w={"full"} align="center" gap={"2"}>
        <Flex align="center" border={"1px"} borderColor={"gray.300"} rounded={"md"}>
          <Button roundedRight={"none"} size="xs" onClick={handleDecrement} isDisabled={quantity <= 1} color={`${color.MAIN_COLOR}.500`} fontSize={"md"}>
            -
          </Button>
          <Input
            border="none"
            padding="0"
            margin="0"
            value={quantity}
            onChange={handleQuantityChange}
            type="number"
            min="0"
            max={product.productQuantity}
            textAlign="center"
            width="50px"
            height="auto"
            fontSize="sm"
            isRequired
            _hover={{ borderColor: "none" }}
            _focus={{ borderColor: "none", boxShadow: "none" }}
          />
          <Button roundedLeft={"none"} size="xs" onClick={handleIncrement} isDisabled={quantity >= product.productQuantity} color={`${color.MAIN_COLOR}.500`} fontSize={"md"}>
            +
          </Button>
        </Flex>
        <Text fontSize="sm">In Stock: {product.productQuantity > 100000 ? "100k+" : product.productQuantity}</Text>
      </Flex>
      <Flex justify={"space-between"}>
        <Text color={"gray.500"}>Subtotal</Text>
        <Flex fontSize="xl" fontWeight={"bold"} lineHeight="tight" color={"orange.500"}>
          <Text>{toRupiah(product.productPrice * quantity, { floatingPoint: 0 })}</Text>
        </Flex>
      </Flex>
      <Button w={"full"} backgroundColor={`${color.MAIN_COLOR}.500`} color={"white"} _hover={{ backgroundColor: `${color.MAIN_COLOR}.700` }} _active={{ color: `${color.MAIN_COLOR}.50` }} fontWeight={"bold"}>
        Add to cart
      </Button>
      <Button
        w={"full"}
        border={"1px"}
        borderColor={`${color.MAIN_COLOR}.500`}
        backgroundColor={"white"}
        color={`${color.MAIN_COLOR}.500`}
        _hover={{ color: `${color.MAIN_COLOR}.700`, borderColor: `${color.MAIN_COLOR}.700` }}
        _active={{ background: `${color.MAIN_COLOR}.50` }}
        fontWeight={"bold"}
      >
        Buy
      </Button>
      <Flex _hover={{ cursor: "pointer" }} justify={"center"} align={"center"} gap={1}>
        <BsHeart size={"15px"} />
        <Text fontWeight={"bold"} fontSize={"sm"}>
          Wishlist
        </Text>
      </Flex>
    </Stack>
  );
}
