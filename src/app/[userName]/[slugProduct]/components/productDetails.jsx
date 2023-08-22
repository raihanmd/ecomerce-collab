"use client";

import React, { useState } from "react";
import { Box, Container, Stack, Text, Image, Flex, Button, Heading, StackDivider, List, ListItem, Divider, Grid, Input } from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

import toRupiah from "@develoka/angka-rupiah-js";

function Rating({ rating }) {
  return (
    <Box dir={"row"} display={"flex"}>
      {Array(5)
        .fill("")
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return <BsStarFill size={"15px"} key={i} style={{ marginLeft: "1" }} color={i < rating ? "orange.500" : "orange.300"} />;
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf size={"15px"} key={i} style={{ marginLeft: "1", color: "orange" }} />;
          }
          return <BsStar size={"15px"} key={i} style={{ marginLeft: "1", color: "orange" }} />;
        })}
    </Box>
  );
}

export default function ProductDetails({ product }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity) && newQuantity <= product.productQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleIncrement = () => {
    if (quantity < product.productQuantity) {
      setQuantity((cur) => cur + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((cur) => cur - 1);
    }
  };

  return (
    <Container maxW={"7xl"}>
      <Flex direction={{ base: "column", md: "row" }} gap={{ md: 5 }} py={5}>
        <Flex direction={"column"}>
          <Flex gap={5} direction={{ base: "column", md: "row" }}>
            <Image
              rounded="md"
              alt={`product of ${product.productName}`}
              src={product.productImage}
              fit="cover"
              align="center"
              w="100%"
              h={"100%"}
              maxW={{ md: "300px" }}
              maxH={{ md: "300px" }}
              position={{ base: "static", md: "sticky" }}
              top={20}
            />
            <Stack>
              <Stack spacing={2}>
                <Heading lineHeight={1.1} fontWeight={600} fontSize={{ base: "2xl", sm: "4xl" }}>
                  {product.productName}
                </Heading>
                <Box display={"flex"} gap={"2"} h={"20px"} alignItems={"center"}>
                  <Text>{product.productRating || "0"}</Text>
                  <Rating rating={product?.productRating} />
                  <Divider orientation="vertical" borderColor={"gray.200"} />
                  <Text>{product.totalReviews || "0"} Penilaian</Text>
                  <Divider orientation="vertical" borderColor={"gray.200"} />
                  <Text>{product.totalOrders || "0"} Terjual</Text>
                </Box>
                <Text fontSize="xl" lineHeight="tight" color={"orange.500"}>
                  {toRupiah(product.productPrice, { floatingPoint: 0 })}
                </Text>
              </Stack>

              <Stack spacing={{ base: 4, sm: 6 }} direction={"column"} divider={<StackDivider borderColor={"gray.200"} />}>
                <StackDivider borderColor={"gray.200"} />
                <Box>
                  <Text fontSize={{ base: "16px", lg: "18px" }} color={"yellow.500"} fontWeight={"500"} textTransform={"uppercase"} mb={"4"}>
                    Description
                  </Text>
                  <Text fontSize={"lg"}>{product.productDescription}</Text>
                </Box>
                <Box>
                  <Text fontSize={{ base: "16px", lg: "18px" }} color={"yellow.500"} fontWeight={"500"} textTransform={"uppercase"} mb={"4"}>
                    Product Details
                  </Text>

                  <List spacing={2}>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Between lugs:
                      </Text>{" "}
                      20 mm
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Bracelet:
                      </Text>{" "}
                      leather strap
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Case:
                      </Text>{" "}
                      Steel
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Case diameter:
                      </Text>{" "}
                      42 mm
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Dial color:
                      </Text>{" "}
                      Black
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Crystal:
                      </Text>{" "}
                      Domed, scratch‑resistant sapphire crystal with anti‑reflective treatment inside
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Water resistance:
                      </Text>{" "}
                      5 bar (50 metres / 167 feet){" "}
                    </ListItem>
                  </List>
                </Box>
              </Stack>
            </Stack>
          </Flex>

          <Flex h={"40vh"}>Komponen Reviews</Flex>
        </Flex>
        <Stack w="sm" h={"full"} position="sticky" top={20} border="1px" p={3} rounded="md" spacing={"3"} display={{ base: "none", lg: "flex" }}>
          <Heading w={"full"} fontSize="xl">
            Atur jumlah pemesanan
          </Heading>
          <Flex w={"full"} align="center" gap={"2"}>
            <Flex align="center" border={"1px"} borderColor={"blue.400"} rounded={"md"}>
              <Button roundedRight={"none"} size="xs" onClick={handleDecrement} isDisabled={quantity <= 1} color={"blue.400"} fontSize={"md"}>
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
                width="30px"
                height="auto"
                fontSize="sm"
                isRequired
                _hover={{ borderColor: "none" }}
                _focus={{ borderColor: "none", boxShadow: "none" }}
              />
              <Button roundedLeft={"none"} size="xs" onClick={handleIncrement} isDisabled={quantity >= product.productQuantity} color={"blue.400"} fontSize={"md"}>
                +
              </Button>
            </Flex>
            <Text fontSize="sm" mt={1}>
              Stok Tersedia: {product.productQuantity}
            </Text>
          </Flex>
          <Button w={"full"}>Tambahkan ke keranjang</Button>
        </Stack>
      </Flex>
    </Container>
  );
}
