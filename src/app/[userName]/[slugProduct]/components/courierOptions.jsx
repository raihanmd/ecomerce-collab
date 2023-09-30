"use client";

import { Container, Flex, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import toRupiah from "@develoka/angka-rupiah-js";

const getCouriersType = (couriers, setSameDay, setNextDay, setRegular, setEconomy, setCargo, setDefaultCouriers) => {
  const sameDayResults = [];
  const nextDayResults = [];
  const regularResults = [];
  const economyResults = [];
  const cargoResults = [];
  const defaultResults = [];

  couriers?.JNE.forEach((jne) => {
    jne.cost.forEach((cost) => {
      if (cost.etd.toLowerCase() === "1-") nextDayResults.push({ ...jne, company: "JNE" });
    });
    if (jne.service === "YES") nextDayResults.push({ ...jne, company: "JNE" });
    else if (jne.service === "OKE") economyResults.push({ ...jne, company: "JNE" });
    else if (jne.service === "REG") regularResults.push({ ...jne, company: "JNE" });
    else defaultResults.push({ ...jne, company: "JNE" });
  });

  couriers?.TIKI.forEach((tiki) => {
    if (tiki.service === "ONS") nextDayResults.push({ ...tiki, company: "TIKI" });
    else if (tiki.service === "ECO") economyResults.push({ ...tiki, company: "TIKI" });
    else if (tiki.service === "REG") regularResults.push({ ...tiki, company: "TIKI" });
    else defaultResults.push({ ...tiki, company: "TIKI" });
  });

  couriers?.POS.forEach((pos) => {
    if (pos.service === "Pos Sameday") sameDayResults.push({ ...pos, company: "POS" });
    else if (pos.service === "Pos Nextday") nextDayResults.push({ ...pos, company: "POS" });
    else if (pos.service === "Pos Reguler") regularResults.push({ ...pos, company: "POS" });
    else if (pos.service === "Pos Kargo") cargoResults.push({ ...pos, company: "POS" });
    else defaultResults.push({ ...pos, company: "POS" });
  });

  setSameDay(sameDayResults);
  setNextDay(nextDayResults);
  setRegular(regularResults);
  setEconomy(economyResults);
  setCargo(cargoResults);
  setDefaultCouriers(defaultResults);
};

export default function CourierOptions({ couriers }) {
  const [sameDay, setSameDay] = useState([]);
  const [nextDay, setNextDay] = useState([]);
  const [regular, setRegular] = useState([]);
  const [economy, setEconomy] = useState([]);
  const [cargo, setCargo] = useState([]);
  const [defaultCouriers, setDefaultCouriers] = useState([]);

  useEffect(() => {
    getCouriersType(couriers, setSameDay, setNextDay, setRegular, setEconomy, setCargo, setDefaultCouriers);
  }, [couriers]);

  return (
    <Flex direction={"column"} gap={"5"} w="full">
      {sameDay.length > 0 && (
        <Container>
          <Text fontWeight={"bold"}>Same Day</Text>
          <UnorderedList paddingLeft={"5"} ringColor={"gray.300"}>
            {sameDay.map((item, i) => (
              <ListItem>
                {item.company} - {item.description}
              </ListItem>
            ))}
          </UnorderedList>
        </Container>
      )}
      {nextDay.length > 0 && (
        <Container>
          <Text fontWeight={"bold"}>Next Day</Text>
          <UnorderedList paddingLeft={"5"}>
            {nextDay.map((item, i) => (
              <ListItem key={i}>
                <Flex justify={"space-between"}>
                  <Text>
                    {item.company} - {item.description}
                  </Text>
                  <Text>{toRupiah(item.cost[0].value, { formal: false, symbol: "IDR" })}</Text>
                </Flex>
                <Text color={"gray.400"} fontSize={"md"}>
                  Estimated delivery {item.cost[0].etd.split(" ")[0] + " day"}
                </Text>
              </ListItem>
            ))}
          </UnorderedList>
        </Container>
      )}
      {regular.length > 0 && (
        <Container>
          <Text fontWeight={"bold"}>Regular</Text>
          <UnorderedList paddingLeft={"5"}>
            {regular.map((item, i) => (
              <ListItem key={i}>
                <Flex justify={"space-between"}>
                  <Text>
                    {item.company} - {item.description}
                  </Text>
                  <Text>{toRupiah(item.cost[0].value, { formal: false, symbol: "IDR" })}</Text>
                </Flex>
                <Text color={"gray.400"} fontSize={"md"}>
                  Estimated delivery {item.cost[0].etd.split(" ")[0] + " day"}
                </Text>
              </ListItem>
            ))}
          </UnorderedList>
        </Container>
      )}
      {economy.length > 0 && (
        <Container>
          <Text fontWeight={"bold"}>Economy</Text>
          <UnorderedList paddingLeft={"5"}>
            {economy.map((item, i) => (
              <ListItem key={i}>
                <Flex justify={"space-between"}>
                  <Text>
                    {item.company} - {item.description}
                  </Text>
                  <Text>{toRupiah(item.cost[0].value, { formal: false, symbol: "IDR" })}</Text>
                </Flex>
                <Text color={"gray.400"} fontSize={"md"}>
                  Estimated delivery {item.cost[0].etd.split(" ")[0] + " day"}
                </Text>
              </ListItem>
            ))}
          </UnorderedList>
        </Container>
      )}
      {cargo.length > 0 && (
        <Container>
          <Text fontWeight={"bold"}>Cargo</Text>
          <UnorderedList paddingLeft={"5"}>
            {cargo.map((item, i) => (
              <ListItem key={i}>
                <Flex justify={"space-between"}>
                  <Text>
                    {item.company} - {item.description}
                  </Text>
                  <Text>{toRupiah(item.cost[0].value, { formal: false, symbol: "IDR" })}</Text>
                </Flex>
                <Text color={"gray.400"} fontSize={"md"}>
                  Estimated delivery {item.cost[0].etd.split(" ")[0] + " day"}
                </Text>
              </ListItem>
            ))}
          </UnorderedList>
        </Container>
      )}
      {defaultCouriers.length > 0 && (
        <Container>
          <Text fontWeight={"bold"}>Etc</Text>
          <UnorderedList paddingLeft={"5"}>
            {defaultCouriers.map((item, i) => (
              <ListItem key={i}>
                <Flex justify={"space-between"}>
                  <Text>
                    {item.company} - {item.description}
                  </Text>
                  <Text>{toRupiah(item.cost[0].value, { formal: false, symbol: "IDR" })}</Text>
                </Flex>
                <Text color={"gray.400"} fontSize={"md"}>
                  Estimated delivery {item.cost[0].etd.split(" ")[0] + " day"}
                </Text>
              </ListItem>
            ))}
          </UnorderedList>
        </Container>
      )}
    </Flex>
  );
}
