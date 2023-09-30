"use client";

import { Flex, Box, Skeleton, Stack, Text, Divider, StackDivider, Tabs, TabList, Tab, TabIndicator, TabPanels, TabPanel, Image, Button, Heading, Container, Input } from "@chakra-ui/react";
import { BsHeart } from "react-icons/bs";

function LoadingProductDetail() {
  return (
    <>
      <Flex w={"full"}>
        <Flex gap={"2"} height={"5"}>
          <Skeleton width={"auto"}>
            <Box>Home</Box>
          </Skeleton>
          <Skeleton width={"4"}></Skeleton>
          <Skeleton width={"auto"}>
            <Box>Some long username</Box>
          </Skeleton>
          <Skeleton width={"4"}></Skeleton>
          <Skeleton width={"auto"}>
            <Box>Some very very long slug product name</Box>
          </Skeleton>
        </Flex>
      </Flex>

      <Container maxW={"7xl"}>
        <Flex direction={{ base: "column", md: "row" }} gap={{ md: 5 }} py={5}>
          <Flex direction={"column"} flex={{ md: "1" }}>
            <Flex gap={5} direction={{ base: "column", md: "row" }}>
              <Skeleton w={"300px"} h={"300px"} />
              <Stack flex={"1"}>
                <Stack spacing={2}>
                  <Skeleton w={"full"} h={"24px"} />
                  <Box display={"flex"} gap={"2"} h={"20px"} alignItems={"center"}>
                    <Skeleton w={"60px"} h={"18px"} />
                    <Divider orientation="vertical" borderColor={"gray.200"} />
                    <Skeleton w={"90px"} h={"18px"} />
                    <Divider orientation="vertical" borderColor={"gray.200"} />
                    <Skeleton w={"90px"} h={"18px"} />
                  </Box>
                  <Skeleton w={"300px"} h={"40px"} />
                </Stack>

                <Stack direction={"column"} divider={<StackDivider borderColor={"gray.200"} />}>
                  <Box>
                    <Tabs position="relative" variant="unstyled" size={"md"} colorScheme="black">
                      <TabList borderBottom={"1px"} borderColor={"gray.200"}>
                        <Tab fontWeight={"semibold"}>
                          <Skeleton w={"90px"} h={"18px"} />
                        </Tab>
                        <Tab fontWeight={"semibold"}>
                          <Skeleton w={"90px"} h={"18px"} />
                        </Tab>
                      </TabList>
                      <TabIndicator mt="-2px" height="3px" bg="green.500" />
                      <TabPanels pt={1}>
                        <TabPanel>
                          <Flex gap={2} direction={"column"}>
                            <Skeleton w={"full"} h={"18px"} />
                            <Skeleton w={"full"} h={"18px"} />
                            <Skeleton w={"full"} h={"18px"} />
                            <Skeleton w={"full"} h={"18px"} />
                            <Skeleton w={"full"} h={"18px"} />
                          </Flex>
                        </TabPanel>
                        <TabPanel>
                          <Flex gap={2} direction={"column"}>
                            <Skeleton w={"full"} h={"18px"} />
                            <Skeleton w={"full"} h={"18px"} />
                            <Skeleton w={"full"} h={"18px"} />
                            <Skeleton w={"full"} h={"18px"} />
                            <Skeleton w={"full"} h={"18px"} />
                          </Flex>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </Box>
                  <Box>
                    <Flex w={"full"} py={1} px={3}>
                      <Flex w={"full"} gap={2} justify={"center"} align={"center"}>
                        <Skeleton width={"14"} height={"14"} />
                        <Flex flex={1} gap={1} direction={"column"}>
                          <Skeleton w={"300px"} h={"18px"} />
                          <Skeleton w={"150px"} h={"12px"} />
                        </Flex>
                        <Skeleton w={"60px"} h={"30px"} />
                      </Flex>
                    </Flex>
                  </Box>
                </Stack>
              </Stack>
            </Flex>
          </Flex>
          <Stack maxW="72" h={"full"} position="sticky" top={20} border="1px" borderColor={"gray.300"} p={3} rounded="md" spacing={"3"} display={{ base: "none", lg: "flex" }}>
            <Skeleton w={"ful"} h={"18px"} />
            <Flex w={"60"} align={"center"} gap={2} maxW={"64"}>
              <Skeleton>
                <Box rounded="md" w="40px" h="40px" />
              </Skeleton>
              <Skeleton>
                <Heading fontSize="sm" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" w="full">
                  Some product long name
                </Heading>
              </Skeleton>
            </Flex>
            <Flex w={"full"} align="center" gap={"2"}>
              <Skeleton w={"90px"} h={"25px"} />
              <Text fontSize="sm">Stok Tersedia: 100</Text>
            </Flex>
            <Flex justify={"space-between"}>
              <Text color={"gray.500"}>Subtotal</Text>
              <Flex fontSize="xl" fontWeight={"bold"} lineHeight="tight" color={"orange.500"}>
                <Text>Rp. 200.000</Text>
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
    </>
  );
}

export default LoadingProductDetail;
