"use client";

import { Box, Flex, Step, StepDescription, StepIndicator, StepSeparator, StepStatus, StepTitle, Stepper, Text } from "@chakra-ui/react";
import { FaLocationDot } from "react-icons/fa6";

import color from "@/const/color";
import { useUserContext } from "@/context/UserContext";

function StepContent({ title, description }) {
  return (
    <>
      <Box flexShrink="0">
        <StepTitle>
          <Text fontSize="xs">{title}</Text>
        </StepTitle>
        <StepDescription>
          <Text fontWeight="bold" color={`${color.MAIN_COLOR}.500`} fontSize="sm">
            {description}
          </Text>
        </StepDescription>
      </Box>
      <StepSeparator />
    </>
  );
}

export function StepComponent({ city, weight }) {
  const user = useUserContext();

  const steps = [
    { title: "Sent from", description: city },
    { title: "Destination", description: user?.city || "Jakarta" },
  ];

  return (
    <Flex direction={"column"} border={"1px"} borderColor={"gray.300"} rounded={"md"} minW={"64"} h={"full"} p={"5"}>
      <Flex direction={"column"} gap={"4"}>
        <Flex direction={"column"}>
          <Text fontSize={"sm"}>Weight Product</Text>
          <Text fontSize={"md"} fontWeight={"bold"} color={`${color.MAIN_COLOR}.500`}>
            {weight} gram
          </Text>
        </Flex>
        <Stepper orientation="vertical" height="110px" gap="0">
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator border="none">
                <StepStatus active={<FaLocationDot />} />
              </StepIndicator>
              <StepContent title={step.title} description={step.description} />
            </Step>
          ))}
        </Stepper>
      </Flex>
    </Flex>
  );
}
