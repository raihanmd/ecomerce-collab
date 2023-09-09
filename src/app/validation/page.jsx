"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { Flex, Box, FormControl, FormLabel, Input, Stack, Button, Text, useToast, Alert, AlertIcon, AlertTitle, Select, VisuallyHidden, Icon, chakra, Textarea } from "@chakra-ui/react";

import { useUserContext } from "@/context/UserContext";
import { fetchGETRajaOngkir } from "@/useFetch/fetchRajaOngkirProvince";

export default function page() {
  const user = useUserContext();

  if (!user) return redirect("/api/auth/signin");

  const toast = useToast();

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");

  const { register, handleSubmit } = useForm();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProvince = async () => {
      try {
        const provinces = await fetchGETRajaOngkir({ option: "province" });
        console.log(provinces);
        setProvinces(provinces.rajaongkir.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProvince();
  }, []);

  useEffect(() => {
    if (!selectedProvince) {
      return;
    }
    const fetchCity = async () => {
      const cities = await fetchGETRajaOngkir({ option: selectedProvince });
      setCities(cities.rajaongkir.results);
    };
    fetchCity();
  }, [selectedProvince]);

  const onSubmitProduct = async (data) => {
    try {
      setIsLoading(true);
      console.log(data);

      return (window.location.href = "/");
    } catch (err) {
      toast({
        title: "Product added failed.",
        position: "top-right",
        status: "error",
        isClosable: true,
      });
      setIsError(true);
      setIsLoading(false);
    }
  };

  return (
    <Flex maxW={"7xl"} minH={"100%"} py={"10"} justify={"center"} direction={{ base: "column-reverse", md: "row" }}>
      <Stack spacing={8} w={"auto"} px={6} mx={{ base: "auto", md: "0" }} mt={{ base: "5", md: "0" }}>
        {isError ? (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>An error has ocured.</AlertTitle>
          </Alert>
        ) : null}
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <form onSubmit={handleSubmit(onSubmitProduct)}>
            <Stack spacing={4}>
              <Text>Warning, do not fill it with real data identity, fill it with dummy data</Text>
              <FormControl id="category" isRequired>
                <FormLabel>Your Province</FormLabel>
                <Select {...register("province")} name="province" value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)} placeholder="Select Province">
                  <option value="">Select Province</option>
                  {provinces.map((province) => (
                    <option key={province.province_id} value={province.province_id}>
                      {province.province}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl id="category" isRequired>
                <FormLabel>Your City</FormLabel>
                <Select {...register("city")} name="city" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} placeholder="Select City" disabled={!selectedProvince}>
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city.city_id} value={city.city_id}>
                      {city.city_name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <Stack spacing={10} pt={2}>
                <Button
                  isLoading={isLoading ? true : false}
                  loadingText={"Adding product..."}
                  type={"submit"}
                  size="lg"
                  bg={"black"}
                  color={"white"}
                  _hover={{
                    bg: "gray.900",
                  }}
                >
                  Add Product
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
