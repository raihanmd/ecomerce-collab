"use client";

import { useState, useEffect, useRef } from "react";
import { Tabs, TabList, Tab, TabIndicator, TabPanels, TabPanel, Text, Button } from "@chakra-ui/react";

import color from "@/const/color";

function ProductTabs({ product }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [lineCount, setLineCount] = useState(10);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseInt(window.getComputedStyle(textRef.current).lineHeight, 10);
      const height = textRef.current.clientHeight;
      const lines = Math.round(height / lineHeight);
      setLineCount(lines);
    }
  }, [product.productDescription]);

  return (
    <Tabs position="relative" variant="unstyled" size={"md"} colorScheme="black">
      <TabList borderBottom={"1px"} borderColor={"gray.200"}>
        <Tab fontWeight={"semibold"}>Description</Tab>
        <Tab fontWeight={"semibold"}>Information</Tab>
      </TabList>
      <TabIndicator mt="-2px" height="3px" bg={`${color.MAIN_COLOR}.500`} />
      <TabPanels pt={1}>
        <TabPanel>
          <Text
            ref={textRef}
            lineHeight="tight"
            whiteSpace={"normal"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            display="-webkit-box"
            style={{
              WebkitLineClamp: isExpanded ? "unset" : lineCount,
              WebkitBoxOrient: "vertical",
            }}
          >
            {product.productDescription}
          </Text>
          {lineCount > 10 && (
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
