"use client";

import { useRef } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Text, Flex, Heading } from "@chakra-ui/react";

import color from "@/const/color";
import { StepComponent } from "./stepComponent";

export default function PostageModal({ postage, weight, city }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  return (
    <>
      <Text ref={finalRef} onClick={onOpen} color={`${color.MAIN_COLOR}.500`} fontWeight={"semibold"} fontSize={"md"} _hover={{ textDecor: "underline", cursor: "pointer" }}>
        Choose courier options
      </Text>
      <Modal size={"4xl"} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading fontSize={"2xl"} fontWeight={"bold"}>
              Choose courier options
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex w={"auto"} gap={"8"}>
              <Flex direction={"column"} border={"1px"} borderColor={"gray.300"} rounded={"md"} minW={"64"} h={"full"} p={"5"}>
                <Flex direction={"column"} gap={"4"}>
                  <Flex direction={"column"}>
                    <Text fontSize={"sm"}>Weight Product</Text>
                    <Text fontSize={"md"} fontWeight={"bold"} color={`${color.MAIN_COLOR}.500`}>
                      {weight} gram
                    </Text>
                  </Flex>
                  <StepComponent city={city} />
                </Flex>
              </Flex>
              <Flex>{JSON.stringify(postage)}</Flex>
            </Flex>
          </ModalBody>

          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}
