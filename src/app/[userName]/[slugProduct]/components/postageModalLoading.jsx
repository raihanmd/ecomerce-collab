"use client";

import { Flex, Skeleton } from "@chakra-ui/react";

export default function PostageModalLoaing() {
  return (
    <>
      <Flex w={"auto"} gap={"8"}>
        <Flex direction={"column"} border={"1px"} borderColor={"gray.300"} rounded={"md"} minW={"64"} h={"full"} p={"5"}>
          <Flex direction={"column"} gap={"4"}>
            <Flex direction={"column"} gap={"2"}>
              <Skeleton w={"40"} h={"4"} />
              <Skeleton w={"32"} h={"6"} />
            </Flex>
            <Flex direction={"column"} gap={"8"}>
              <Flex px={"5"} gap={"2"}>
                <Skeleton w={"10"} h={"10"} />
                <Flex direction={"column"} gap={"1"} justify={"center"}>
                  <Skeleton w={"24"} h={"3"} />
                  <Skeleton w={"16"} h={"4"} />
                </Flex>
              </Flex>
              <Flex px={"5"} gap={"2"}>
                <Skeleton w={"10"} h={"10"} />
                <Flex direction={"column"} gap={"1"} justify={"center"}>
                  <Skeleton w={"24"} h={"3"} />
                  <Skeleton w={"16"} h={"4"} />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex direction={"column"} gap={"5"} w={"full"}>
          <Flex direction={"column"}>
            {Array(3)
              .fill("")
              .map(() => (
                <>
                  <Skeleton w={"32"} h={"5"} />
                  <Flex direction={"column"} paddingLeft={"5"} py={"2"} gap={"2"}>
                    {Array(2)
                      .fill("")
                      .map(() => (
                        <Flex gap={"3"}>
                          <Skeleton w={"3"} h={"3"} />
                          <Flex direction={"column"} gap={"2"} w={"full"}>
                            <Flex justify={"space-between"}>
                              <Skeleton w={"52"} h={"5"} />
                              <Skeleton w={"32"} h={"5"} />
                            </Flex>
                            <Skeleton w={"40"} h={"3"} />
                          </Flex>
                        </Flex>
                      ))}
                  </Flex>
                </>
              ))}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
