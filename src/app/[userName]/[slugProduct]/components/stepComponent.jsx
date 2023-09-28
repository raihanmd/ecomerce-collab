"use client";

import { Box, Step, StepDescription, StepIndicator, StepSeparator, StepStatus, StepTitle, Stepper, Text } from "@chakra-ui/react";
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

export function StepComponent({ city }) {
  const user = useUserContext();

  const steps = [
    { title: "Dikirim dari", description: city },
    { title: "Dikirim ke", description: user.city || "Jakarta" },
  ];

  return (
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
  );
}
