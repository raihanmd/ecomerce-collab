"use client";

import Link from "next/link";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { BsStar } from "react-icons/bs";

import unslugify from "@/utils/unslugify";

export default function OwnerCard({ product }) {
  return (
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
              <span style={{ color: "black" }}>{product.ownerTotalRating || "0"}</span> average ratings
            </Text>
          </Flex>
        </Flex>
        <Button>Follow</Button>
      </Flex>
    </Flex>
  );
}
