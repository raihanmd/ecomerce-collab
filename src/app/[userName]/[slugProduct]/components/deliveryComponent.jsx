"use client";

import React, { useState, useEffect } from "react";
import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { FaShippingFast } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import toRupiah from "@develoka/angka-rupiah-js";

import { fetchPOST } from "@/useFetch/fetchPOST";

export const DeliveryComponent = ({ city, origin, destination, weight }) => {
  const [postage, setPostage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchPOST("/api/rajaongkir/cost", { origin, destination, weight }, { component: "client" });
        if (result.statusCode !== 200) throw Error(result.payload);
        setPostage(result.payload);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box px={"3"}>
      <Heading fontSize={"xl"} fontWeight={"bold"}>
        Delivery
      </Heading>
      <Flex direction={"column"} pt={"2"}>
        <Flex gap={"2"} align={"baseline"}>
          <Icon as={SlLocationPin} transform={"translateY(1px)"} />
          <Text>
            Deliver from <span style={{ fontWeight: "bold" }}>{city}</span>
          </Text>
        </Flex>
        <Flex gap={"2"} align={"baseline"}>
          <Icon as={FaShippingFast} transform={"translateY(2px)"} />
          <Box>
            <Text>Postage Reguler {toRupiah(`10000`, { k: true, floatingPoint: 0, useUnit: true, symbol: null })}</Text>
            <Text color={"gray.500"}>Estimated arrival 1 - 4 hari</Text>
            {JSON.stringify(postage)}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
