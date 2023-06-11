"use client";

import { Flex, Box, Image, Badge, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import convertRupiah from "rupiah-format";

import { productIsNew } from "@/utils/productIsNew";

function Rating({ rating, numReviews }) {
  return (
    <Box dir={"row"} display={"flex"}>
      {Array(5)
        .fill("")
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return <BsStarFill key={i} style={{ marginLeft: "1" }} color={i < rating ? "orange.500" : "orange.300"} />;
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{ marginLeft: "1", color: "orange" }} />;
          }
          return <BsStar key={i} style={{ marginLeft: "1", color: "orange" }} />;
        })}
      {numReviews ? (
        <Box as="span" ml="2" color="gray.600" fontSize={"xs"}>
          {numReviews} review{numReviews > 1 && "s"}
        </Box>
      ) : (
        <Box as="span" ml="2" color="gray.600" fontSize={"xs"}>
          no reviews
        </Box>
      )}
    </Box>
  );
}

function ProductCard({ products }) {
  return (
    <Flex mt={10} w={"full"} justifyContent="center" direction={{ base: "column", md: "row" }} flexWrap={"wrap"} gap={"5"}>
      {products.payload.map((product) => (
        <Link href={`/${product.ownedBy}/${product.productSlug}`}>
          <Box bg={"white"} w={"60"} h={"auto"} rounded="lg" shadow="lg" position="relative">
            {productIsNew(product.createdAt) && (
              <Badge position="absolute" top={2} right={2} rounded="full" px="2" fontSize="0.8em" colorScheme="blue">
                Baru
              </Badge>
            )}

            <Image src={product.productImage} alt={`Picture of ${product.productName}`} roundedTop="lg" w={"full"} h={"64"} objectFit={"cover"} />
            <Box p={"4"}>
              <Flex direction={"column"} justifyContent="space-between" alignContent="center" gap={1} whiteSpace={"nowrap"} overflow={"hidden"} textOverflow={"ellipsis"}>
                <Heading fontSize="lg" fontWeight="semibold" as="h5" lineHeight="tight">
                  {product.productName}
                </Heading>
                <Rating rating={product.productRating} numReviews={product.totalOrders} />
                <Text fontSize="md" fontWeight="semibold" as="h4" lineHeight="tight">
                  {convertRupiah.convert(product.productPrice)}
                </Text>
              </Flex>
            </Box>
          </Box>
        </Link>
      ))}
    </Flex>
  );
}

export default ProductCard;
