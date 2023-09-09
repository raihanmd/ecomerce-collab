"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { Flex, Box, FormControl, FormLabel, Stack, Button, Text, useToast, Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList } from "@choc-ui/chakra-autocomplete";

import { useUserContext } from "@/context/UserContext";
import { fetchGET } from "@/useFetch/fetchGET";

export default function page() {
  const user = useUserContext();

  if (!user) return redirect("/api/auth/signin");

  const toast = useToast();

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");

  const { register, handleSubmit, setValue } = useForm();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleProvince = (province) => {
    setValue("province", province);
  };

  const handleCity = (city) => {
    setValue("city", city);
  };

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const { payload } = await fetchGET("/api/rajaongkir/province", { component: "client" });
        setProvinces(payload);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (!selectedProvince) {
      return;
    }

    const fetchCities = async () => {
      try {
        const { payload } = await fetchGET(`/api/rajaongkir/city/${selectedProvince}`, { component: "client" });
        setCities(payload);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, [selectedProvince]);

  const onSubmitValidation = async (data) => {
    try {
      setIsLoading(true);
      console.log(data);

      // return (window.location.href = "/");
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
          <form onSubmit={handleSubmit(onSubmitValidation)}>
            <Stack spacing={4}>
              <Text>Warning, do not fill it with real data identity, fill it with dummy data</Text>
              <FormControl id="province" isRequired>
                <FormLabel>Your Province</FormLabel>
                <AutoComplete openOnFocus>
                  <AutoCompleteInput variant="filled" />
                  <AutoCompleteList>
                    {provinces.map((province) => (
                      <AutoCompleteItem key={`option-${province.province_id}`} value={province.province_id} textTransform="capitalize" align="center">
                        <Text ml="4">{province.province}</Text>
                      </AutoCompleteItem>
                    ))}
                  </AutoCompleteList>
                </AutoComplete>
              </FormControl>
              {selectedProvince && (
                <FormControl id="city" isRequired>
                  <FormLabel>Your City</FormLabel>
                  <AutoComplete openOnFocus>
                    <AutoCompleteInput variant="filled" />
                    <AutoCompleteList>
                      {cities.map((city) => (
                        <AutoCompleteItem key={`option-${city.city_id}`} value={city.city_id} textTransform="capitalize" align="center">
                          <Text ml="4">{city.city}</Text>
                        </AutoCompleteItem>
                      ))}
                    </AutoCompleteList>
                  </AutoComplete>
                </FormControl>
              )}

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
