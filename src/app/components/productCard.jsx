"use client";

import { Flex, Circle, Box, Image, Badge, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

const data = {
  isNew: true,
  imageURL: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80",
  name: "Wayfarer Classic",
  price: 4.5,
  rating: 3.5,
  numReviews: 34,
};

function Rating({ rating, numReviews }) {
  return (
    <Box dir={"row"} display={"flex"}>
      {Array(5)
        .fill("")
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return <BsStarFill key={i} style={{ marginLeft: "1" }} color={i < rating ? "teal.500" : "gray.300"} />;
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
          }
          return <BsStar key={i} style={{ marginLeft: "1" }} />;
        })}
      {numReviews ? (
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          {numReviews} review{numReviews > 1 && "s"}
        </Box>
      ) : (
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          no reviews
        </Box>
      )}
    </Box>
  );
}

function ProductCard({ products }) {
  console.log(products);
  return (
    <Flex mt={10} w={"full"} justifyContent="center" direction={{ base: "column", md: "row" }} flexWrap={"wrap"} gap={"5"}>
      {products.payload.map((product) => (
        <Box as={Link} bg={"white"} maxW="72" borderWidth="1px" rounded="lg" shadow="lg" position="relative" href={`/${product.ownedBy}/${product.productSlug}`}>
          {data.isNew && <Circle size="10px" position="absolute" top={2} right={2} bg="red.200" />}

          <Image src={data.imageURL} alt={`Picture of ${data.name}`} roundedTop="lg" />

          <Box p={"4"}>
            <Box d="flex" alignItems="baseline">
              {data.isNew && (
                <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                  New
                </Badge>
              )}
            </Box>

            <Flex direction={"column"} justifyContent="space-between" alignContent="center">
              <Heading fontSize="2xl" fontWeight="semibold" as="h4" lineHeight="tight">
                {product.productName}
              </Heading>
              <Rating rating={product.productRating} numReviews={product.totalOrders} />
              <Text fontSize="lg" fontWeight="semibold" as="h4" lineHeight="tight">
                {product.productPrice}
              </Text>
            </Flex>
          </Box>
        </Box>
      ))}
    </Flex>
  );
}

export default ProductCard;
