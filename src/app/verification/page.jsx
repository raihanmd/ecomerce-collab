"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { Stack, FormControl, FormLabel, Select, Button, Flex, Box, useToast, Alert, AlertIcon, AlertTitle, Textarea } from "@chakra-ui/react";

import { useUserContext } from "@/context/UserContext";
import { fetchGET } from "@/useFetch/fetchGET";
import { fetchPOST } from "@/useFetch/fetchPOST";

export default function page() {
  const user = useUserContext();

  if (!user) return redirect("/api/auth/signin");
  if (!!user.city || !!user.cityId) return redirect("/");

  const toast = useToast();

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedProvinceId, setSelectedProvinceId] = useState(null);
  const [selectedProvinceName, setSelectedProvinceName] = useState(null);
  const [selectedCityName, setSelectedCityName] = useState(null);

  const { register, handleSubmit } = useForm();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        setIsLoading(true);
        const { payload } = await fetchGET("/api/rajaongkir/province", { component: "client" });
        setProvinces(payload);
        setIsLoading(false);
      } catch (error) {
        toast({
          title: "Something went wrong.",
          position: "top-right",
          status: "error",
          isClosable: true,
        });
        setIsLoading(false);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (!selectedProvinceId) return;

    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const { payload } = await fetchGET(`/api/rajaongkir/city/${selectedProvinceId}`, { component: "client" });
        setCities(payload);
        setIsLoading(false);
      } catch (error) {
        toast({
          title: "Something went wrong.",
          position: "top-right",
          status: "error",
          isClosable: true,
        });
        setIsLoading(false);
      }
    };

    fetchCities();
  }, [selectedProvinceId]);

  const handleProvinceChange = async (e) => {
    setSelectedProvinceId(e.target.value);
    setSelectedProvinceName(e.target.options[e.target.selectedIndex].getAttribute("data-province"));

    if (selectedProvinceId) {
      try {
        const { payload } = await fetchGET(`/api/rajaongkir/city/${selectedProvinceId}`, { component: "client" });
        setCities(payload);
      } catch (error) {
        toast({
          title: "Something went wrong.",
          position: "top-right",
          status: "error",
          isClosable: true,
        });
        setIsError(true);
      }
    } else {
      setCities([]);
    }
  };

  const onSubmitValidation = async (data) => {
    try {
      setIsLoading(true);
      setIsLoadingSubmit(true);

      const formData = {
        userId: user.id,
        userProvince: selectedProvinceName,
        userProvinceId: data.province,
        userCity: selectedCityName,
        userCityId: data.city,
        userBio: data.bio,
        userShopDesc: data.shopDesc,
      };

      const { statusCode } = await fetchPOST("/api/verification", formData, { component: "client" });

      if (statusCode !== 200) throw new Error();
      toast({
        title: "Your account verified.",
        position: "top-right",
        status: "success",
        isClosable: true,
      });

      return (window.location.href = "/account");
    } catch (err) {
      toast({
        title: "Something went srong.",
        position: "top-right",
        status: "error",
        isClosable: true,
      });
      setIsError(true);
      setIsLoading(false);
      setIsLoadingSubmit(false);
    }
  };

  return (
    <Flex maxW={"7xl"} minH={"100%"} py={"10"} justify={"center"} direction={{ base: "column-reverse", md: "row" }}>
      <Stack spacing={8} w={{ base: "auto", sm: "md", md: "xl" }} px={6} mx={{ base: "auto", md: "0" }} mt={{ base: "5", md: "0" }}>
        {isError ? (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>An error has ocured.</AlertTitle>
          </Alert>
        ) : (
          <Alert status="warning">
            <AlertIcon />
            Do not fill it with your real data identity.
          </Alert>
        )}
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <form onSubmit={handleSubmit(onSubmitValidation)}>
            <Stack spacing={4}>
              <FormControl id="bio" isRequired>
                <FormLabel>Bio</FormLabel>
                <Textarea {...register("bio")} type="text" placeholder="Some epic bio..." maxLength={50} />
              </FormControl>
              <FormControl id="shopDesc" isRequired>
                <FormLabel>Shop Description</FormLabel>
                <Textarea {...register("shopDesc")} type="text" placeholder="Awesome shop description..." maxLength={255} />
              </FormControl>
              <FormControl id="province" isRequired>
                <FormLabel>Your Province</FormLabel>
                <Select {...register("province")} placeholder={"Select Your Province"} onChange={handleProvinceChange} onActive={{ borderColor: "black" }}>
                  {provinces.map((province) => (
                    <option key={`province-option-${province.province_id}`} data-province={province.province} value={province.province_id}>
                      {province.province}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl id="city" isRequired>
                <FormLabel>Your City</FormLabel>
                <Select
                  {...register("city")}
                  placeholder={isLoading ? "Loading..." : "Select Your City"}
                  onChange={(e) => setSelectedCityName(e.target.options[e.target.selectedIndex].getAttribute("data-city"))}
                  onActive={{ borderColor: "black" }}
                  isDisabled={!selectedProvinceId || isLoading}
                >
                  {cities.map((city) => (
                    <option key={`city-option-${city.city_id}`} value={city.city_id} data-city={city.city_name}>
                      {city.city_name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <Stack spacing={10} pt={2}>
                <Button
                  isLoading={isLoadingSubmit ? true : false}
                  loadingText={"Adding product..."}
                  type={"submit"}
                  size="lg"
                  bg={"black"}
                  color={"white"}
                  _hover={{
                    bg: "gray.900",
                  }}
                >
                  Confirm my verification
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
