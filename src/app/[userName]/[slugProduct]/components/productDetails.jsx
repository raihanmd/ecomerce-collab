"use client";

import React, { Suspense, useState } from "react";
import { Box, Container, Stack, Text, Image, Flex, Heading, StackDivider, Divider } from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

import toRupiah from "@develoka/angka-rupiah-js";
import { DeliveryComponent } from "./deliveryComponent";
import { useUserContext } from "@/context/UserContext";
import ProductTabs from "./productTabs";
import OwnerCard from "./ownerCard";
import BookingCard from "./bookingCard";

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
  const user = useUserContext();

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
                  <Text>{product.totalReviews || "0"} Rating</Text>
                  <Divider orientation="vertical" borderColor={"gray.200"} />
                  <Text>{product.totalOrders || "0"} Sold</Text>
                </Box>
                <Text fontSize="3xl" fontWeight={"bold"} lineHeight="tight" color={"orange.500"}>
                  {toRupiah(product.productPrice, { floatingPoint: 0 })}
                </Text>
              </Stack>

              <Stack direction={"column"} divider={<StackDivider borderColor={"gray.200"} />}>
                <ProductTabs product={product} />
                <OwnerCard product={product} />
                <DeliveryComponent city={product.ownerCity} origin={product.ownerCityId} destination={user?.cityId || "152"} weight={product.productWeight} />
              </Stack>
            </Stack>
          </Flex>

          <Suspense>
            <Flex h={"40vh"}>Komponen Reviews</Flex>
          </Suspense>
        </Flex>
        <BookingCard product={product} quantity={quantity} handleQuantityChange={handleQuantityChange} handleIncrement={handleIncrement} handleDecrement={handleDecrement} />
      </Flex>
    </Container>
  );
}
