"use client";

import { useState, useEffect, useRef } from "react";
import { Tabs, TabList, Tab, TabIndicator, TabPanels, TabPanel, Text, Button } from "@chakra-ui/react";

import color from "@/const/color";

const textStyles = {
  WebkitLineClamp: 10,
  lineClamp: 10,
  WebkitBoxOrient: "vertical",
  boxOrient: "vertical",
};

function ProductTabs({ product }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMoreButton, setShowReadMoreButton] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) setShowReadMoreButton(textRef.current.scrollHeight !== textRef.current.clientHeight);
  }, []);

  return (
    <Tabs position="relative" variant="unstyled" size={"md"} colorScheme="black">
      <TabList borderBottom={"1px"} borderColor={"gray.200"}>
        <Tab fontWeight={"semibold"}>Description</Tab>
        <Tab fontWeight={"semibold"}>Information</Tab>
      </TabList>

      <TabIndicator mt="-2px" height="3px" bg={`${color.MAIN_COLOR}.500`} />
      <TabPanels pt={1}>
        <TabPanel>
          <Text ref={textRef} overflow={"hidden"} display="-webkit-box" style={isExpanded ? null : textStyles}>
            {product.productDescription}
          </Text>
          {showReadMoreButton && (
            <Button variant={"link"} color={`${color.MAIN_COLOR}.500`} onClick={() => setIsExpanded((prev) => !prev)}>
              {isExpanded ? "Read Less" : "Read More"}
            </Button>
          )}
        </TabPanel>
        <TabPanel>
          <Text>{product.ownerShopDescription || "User shop description"}</Text>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default ProductTabs;
