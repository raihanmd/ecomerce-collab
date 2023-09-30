"use client";

import { useRef } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Text, Flex, Heading, Skeleton } from "@chakra-ui/react";

import color from "@/const/color";
import { StepComponent } from "./stepComponent";
import CourierOptions from "./courierOptions";
import PostageModalLoaing from "./postageModalLoading";

export default function PostageModal({ postage, weight, city, isLoading }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  return (
    <>
      <Text ref={finalRef} onClick={onOpen} color={`${color.MAIN_COLOR}.500`} fontWeight={"semibold"} fontSize={"md"} _hover={{ textDecor: "underline", cursor: "pointer" }}>
        Courier options
      </Text>
      <Modal size={"3xl"} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isLoading ? (
              <Skeleton w={"60"} h={"8"} />
            ) : (
              <Heading fontSize={"2xl"} fontWeight={"bold"}>
                Courier options
              </Heading>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoading ? (
              <PostageModalLoaing />
            ) : (
              <Flex w={"auto"} gap={"8"}>
                <StepComponent city={city} weight={weight} />
                <CourierOptions couriers={postage} />
              </Flex>
            )}
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}
