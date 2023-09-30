"use client";

import { Flex, Box, Badge, Text } from "@chakra-ui/react";
import Link from "next/link";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import toRupiah from "@develoka/angka-rupiah-js";

import { productIsNew } from "@/utils/productIsNew";
import BlurImage from "./blurImage";

function Rating({ rating }) {
  return (
    <Box dir={"row"} display={"flex"}>
      {Array(5)
        .fill("")
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return <BsStarFill size={"12px"} key={i} style={{ marginLeft: "1" }} color={i < rating ? "orange.500" : "orange.300"} />;
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf size={"12px"} key={i} style={{ marginLeft: "1", color: "orange" }} />;
          }
          return <BsStar size={"12px"} key={i} style={{ marginLeft: "1", color: "orange" }} />;
        })}
    </Box>
  );
}

function ProductCard({ products, preview }) {
  return (
    <Flex w={"full"} justifyContent="center" direction={"row"} alignContent={"start"} flexWrap={"wrap"} gap={"2"} px={"2"}>
      {products.map((product) =>
        preview ? (
          <ProductContent product={product} key={product?.productId} />
        ) : (
          <Link href={`/${product?.ownedBy}/${product?.productSlug}`} key={product?.productId} className={"card-product"}>
            <ProductContent product={product} key={product?.productId} />
          </Link>
        )
      )}
    </Flex>
  );
}

const ProductContent = ({ product }) => {
  return (
    <Box bg={"white"} w={{ base: "full", sm: "48" }} h={"auto"} rounded="sm" shadow="sm" position="relative" transition={"all 100ms ease"} _hover={{ transform: "translateY(-5px)", shadow: "lg" }}>
      {productIsNew(product?.createdAt) && (
        <Badge position="absolute" top={2} right={2} rounded="full" px="2" fontSize="0.8em" colorScheme="blue">
          Baru
        </Badge>
      )}

      <BlurImage imageUrl={product.productImage ? product.productImage : "https://placeholder.com/250x250"} blurhash={product?.productBlurhash} />

      <Box p={"2"}>
        <Flex direction={"column"} justifyContent="space-between" alignContent="center" gap={"2"} h={"5.5em"}>
          <Flex direction={"column"} gap={"1"}>
            <Text fontSize="xs" lineHeight="tight" whiteSpace={"normal"} overflow={"hidden"} textOverflow={"ellipsis"} display="-webkit-box" style={{ WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
              {product.productName || "Product name placeholder here"}
            </Text>

            <Rating rating={product?.productRating} />
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Text fontSize="xs" lineHeight="tight" color={"orange.500"}>
              {toRupiah(product.productPrice || 100000, { floatingPoint: 0 })}
            </Text>
            {product.totalOrders ? (
              <Box as="span" ml="2" color="gray.600" fontSize={"xs"}>
                {toRupiah(product?.totalOrders, { formal: false, useUnit: true, k: true, floatingPoint: 0 })} terjual{product?.totalOrders > 1 && "s"}
              </Box>
            ) : (
              <Box as="span" ml="2" color="gray.600" fontSize={"xs"}>
                sold 0
              </Box>
            )}
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default ProductCard;
