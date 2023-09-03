"use client";

import React, { Suspense, useState } from "react";
import { Box, Container, Stack, Text, Image, Flex, Button, Heading, StackDivider, Divider, Input, Tabs, TabList, Tab, TabIndicator, TabPanels, TabPanel, Icon } from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf, BsHeart } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { FaShippingFast } from "react-icons/fa";

import toRupiah from "@develoka/angka-rupiah-js";
import unslugify from "@/utils/unslugify";
import Link from "next/link";

function Rating({ rating }) {
  return (
    <Box dir={"row"} display={"flex"} transform={"translateY(-2px)"}>
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
        <Flex direction={"column"} flex={{ md: "1" }}>
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
            <Stack flex={"1"}>
              <Stack spacing={2}>
                <Heading lineHeight={1.1} fontWeight={600} fontSize={"2xl"}>
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
                <Text fontSize="3xl" fontWeight={"bold"} lineHeight="tight" color={"orange.500"}>
                  {toRupiah(product.productPrice, { floatingPoint: 0 })}
                </Text>
              </Stack>

              <Stack direction={"column"} divider={<StackDivider borderColor={"gray.200"} />}>
                <Box>
                  <Tabs position="relative" variant="unstyled" size={"md"} colorScheme="black">
                    <TabList borderBottom={"1px"} borderColor={"gray.200"}>
                      <Tab fontWeight={"semibold"}>Description</Tab>
                      <Tab fontWeight={"semibold"}>Info Penting</Tab>
                    </TabList>
                    <TabIndicator mt="-2px" height="3px" bg="green.500" />
                    <TabPanels pt={1}>
                      <TabPanel>
                        <Text>{product.productDescription}</Text>
                      </TabPanel>
                      <TabPanel>
                        <Text>{product.ownerShopDescription || "User shop description"}</Text>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Box>
                <Box>
                  <Flex w={"full"} py={1} px={3}>
                    <Flex w={"full"} gap={2} justify={"center"} align={"center"}>
                      <Link href={`/${product.ownedBy}`}>
                        <Image borderRadius="full" width={"14"} src={product.ownerImage} alt={`Picture of ${product.ownerImage}`} />
                      </Link>
                      <Flex flex={1} direction={"column"}>
                        <Link href={`/${product.ownedBy}`}>
                          <Text fontWeight={"bold"}>{unslugify(product.ownedBy)}</Text>
                        </Link>
                        <Flex align={"start"} gap={1}>
                          <BsStar size={"18px"} style={{ color: "orange" }} />
                          <Text color={"gray.500"}>
                            <span style={{ color: "black" }}>{product.ownerTotalRating || "0"}</span> rata-rata ulasan
                          </Text>
                        </Flex>
                      </Flex>
                      <Button>Follow</Button>
                    </Flex>
                  </Flex>
                </Box>
                <Box px={"3"}>
                  <Heading fontSize={"xl"} fontWeight={"bold"}>
                    Pengiriman
                  </Heading>
                  <Flex direction={"column"} pt={"2"}>
                    <Flex gap={"2"} align={"baseline"}>
                      <Icon as={SlLocationPin} transform={"translateY(1px)"} />
                      <Text>
                        Dikirim dari <span style={{ fontWeight: "bold" }}>{product.ownerCity}</span>
                      </Text>
                    </Flex>
                    <Flex gap={"2"} align={"baseline"}>
                      <Icon as={FaShippingFast} transform={"translateY(2px)"} />
                      <Box>
                        <Text>Ongkir Reguler 8rb - 15rb</Text>
                        <Text color={"gray.500"}>Estimasi tiba 1 - 4 hari</Text>
                      </Box>
                    </Flex>
                  </Flex>
                </Box>
              </Stack>
            </Stack>
          </Flex>

          <Suspense>
            <Flex h={"40vh"}>Komponen Reviews</Flex>
          </Suspense>
        </Flex>
        <Stack maxW="72" h={"full"} position="sticky" top={20} border="1px" borderColor={"gray.300"} p={3} rounded="md" spacing={"3"} display={{ base: "none", lg: "flex" }}>
          <Heading w={"full"} fontSize="lg">
            Atur jumlah pemesanan
          </Heading>
          <Flex w={"60"} align={"center"} gap={2} maxW={"64"}>
            <Image rounded="md" alt={`product of ${product.productName}`} src={product.productImage} fit="cover" align="center" w="40px" h="40px" />
            <Heading fontSize="sm" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" w="full">
              {product.productName}
            </Heading>
          </Flex>
          <Flex w={"full"} align="center" gap={"2"}>
            <Flex align="center" border={"1px"} borderColor={"gray.300"} rounded={"md"}>
              <Button roundedRight={"none"} size="xs" onClick={handleDecrement} isDisabled={quantity <= 1} color={"green.500"} fontSize={"md"}>
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
              <Button roundedLeft={"none"} size="xs" onClick={handleIncrement} isDisabled={quantity >= product.productQuantity} color={"green.500"} fontSize={"md"}>
                +
              </Button>
            </Flex>
            <Text fontSize="sm">Stok Tersedia: {product.productQuantity > 100000 ? "100k+" : product.productQuantity}</Text>
          </Flex>
          <Flex justify={"space-between"}>
            <Text color={"gray.500"}>Subtotal</Text>
            <Flex fontSize="xl" fontWeight={"bold"} lineHeight="tight" color={"orange.500"}>
              <Text>{toRupiah(product.productPrice * quantity, { floatingPoint: 0 })}</Text>
            </Flex>
          </Flex>
          <Button w={"full"} backgroundColor={"green.500"} color={"white"} _hover={{ backgroundColor: "green.700" }} _active={{ color: "green.50" }} fontWeight={"bold"}>
            Tambahkan ke keranjang
          </Button>
          <Button w={"full"} border={"1px"} borderColor={"green.500"} backgroundColor={"white"} color={"green.500"} _hover={{ color: "green.700", borderColor: "green.700" }} _active={{ background: "green.50" }} fontWeight={"bold"}>
            Beli
          </Button>
          <Flex _hover={{ cursor: "pointer" }} justify={"center"} align={"center"} gap={1}>
            <BsHeart size={"15px"} />
            <Text fontWeight={"bold"} fontSize={"sm"}>
              Wishlist
            </Text>
          </Flex>
        </Stack>
      </Flex>
    </Container>
  );
}
