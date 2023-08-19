"use client";

import { Box, Container, Stack, Text, Image, Flex, VStack, Button, Heading, SimpleGrid, StackDivider, List, ListItem, Divider } from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { MdLocalShipping } from "react-icons/md";

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
  return (
    <Container maxW={"7xl"}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, md: 10 }} py={5}>
        <Flex>
          <Image rounded={"md"} alt={`product of ${product.productName}`} src={product.productImage} fit={"cover"} align={"center"} w={"100%"} h={{ base: "100%", md: "580px" }} />
        </Flex>
        <Stack>
          <Stack spacing={2}>
            <Heading lineHeight={1.1} fontWeight={600} fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}>
              {product.productName}
            </Heading>
            <Box display={"flex"} gap={"2"} h={"20px"} alignItems={"center"}>
              <Text>{product.productRating || "0"}</Text>
              <Rating rating={product?.productRating} />
              <Divider orientation="vertical" />
              <Text>{product.totalReviews || "0"} Penilaian</Text>
              <Divider orientation="vertical" />
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
                Features
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>Chronograph</ListItem>
                  <ListItem>Master Chronometer Certified</ListItem> <ListItem>Tachymeter</ListItem>
                </List>
                <List spacing={2}>
                  <ListItem>Anti‑magnetic</ListItem>
                  <ListItem>Chronometer</ListItem>
                  <ListItem>Small seconds</ListItem>
                </List>
              </SimpleGrid>
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

          <Button
            rounded={"none"}
            w={"full"}
            mt={8}
            size={"lg"}
            py={"7"}
            bg={"gray.900"}
            color={"white"}
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
          >
            Add to cart
          </Button>

          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
