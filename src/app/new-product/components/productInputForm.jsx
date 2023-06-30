"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { redirect } from "next/navigation";
import { Flex, Box, FormControl, FormLabel, Input, Stack, Button, Text, useToast, Alert, AlertIcon, AlertTitle, Select } from "@chakra-ui/react";

import color from "@/const/color";
import { fetchPOST } from "@/useFetch/fetchPOST";
import { uploadImage } from "@/firebase/uploadImage";
import { getImageURL } from "@/firebase/getImageURL";
import { deleteImage } from "@/firebase/deleteImage";
import { useUserContext } from "@/context/UserContext";
import { generateImageName } from "@/utils/generateImageName";
import { useCategoriesContext } from "@/context/CategoriesContext";
import getUnixTimestamps from "@/utils/getUnixTimestamps";
import ProductCard from "@/app/components/productCard";

export default function ProductInputForm() {
  const categories = useCategoriesContext();
  const user = useUserContext();

  if (!user) return redirect("/api/auth/signin");

  const toast = useToast();

  const { register, handleSubmit } = useForm();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewProductImage, setPreviewProductImage] = useState(null);
  const [previewProductPrice, setPreviewProductPrice] = useState(null);
  const [previewProductName, setPreviewProductName] = useState(null);

  const onSubmitProduct = async (data) => {
    const imageProduct = generateImageName(data.image[0].name);
    try {
      setIsLoading(true);

      await uploadImage(data.image[0], imageProduct).catch((err) => {
        throw err;
      });

      const productImage = await getImageURL(imageProduct).catch((err) => {
        throw err;
      });

      const response = await fetchPOST("/api/blurhash", { productImage }, { component: "client" });

      if (response.statusCode !== 200) throw new Error();

      const newProduct = {
        userId: user.id,
        productName: data.name,
        productPrice: data.price,
        productCategory: data.cat,
        productDescription: data.desc,
        productQuantity: data.qty,
        productImage,
        blurhash: response.payload.blurhash,
      };
      const { statusCode } = await fetchPOST("/api/products", newProduct, { component: "client" });

      if (statusCode !== 200) throw new Error();
      toast({
        title: "Product added successfully.",
        position: "top-right",
        status: "success",
        isClosable: true,
      });

      setPreviewProductImage(null);
      setPreviewProductPrice(null);
      setPreviewProductName(null);

      return (window.location.href = "/");
    } catch (err) {
      toast({
        title: "Product added failed.",
        position: "top-right",
        status: "error",
        isClosable: true,
      });
      await deleteImage(imageProduct);
      setIsError(true);
      setIsLoading(false);
    }
  };

  return (
    <Flex maxW={"7xl"} minH={"100%"} py={"10"} justify={"center"} direction={{ base: "column-reverse", md: "row" }}>
      <Stack spacing={8} w={"auto"} px={6} mx={{ base: "auto", md: "0" }}>
        {isError ? (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>An error has ocured.</AlertTitle>
          </Alert>
        ) : null}
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <form onSubmit={handleSubmit(onSubmitProduct)}>
            <Stack spacing={4}>
              <FormControl id="name" isRequired>
                <FormLabel>Name Product</FormLabel>
                <Input {...register("name")} type="text" name="name" value={previewProductName} onChange={(e) => setPreviewProductName(e.target.value)} />
              </FormControl>
              <FormControl id="description" isRequired>
                <FormLabel>Description Product</FormLabel>
                <Input {...register("desc")} type="text" name="desc" />
              </FormControl>
              <FormControl id="category" isRequired>
                <FormLabel>Category Product</FormLabel>
                <Select {...register("cat")} placeholder="Select Category" name="cat">
                  {categories.map((category) => (
                    <option value={category.name}>{category.name}</option>
                  ))}
                </Select>
              </FormControl>
              <FormControl id="price" isRequired>
                <FormLabel>Price Product</FormLabel>
                <Input {...register("price")} type="number" name="price" value={previewProductPrice} onChange={(e) => setPreviewProductPrice(parseFloat(e.target.value))} />
              </FormControl>
              <FormControl id="quantity" isRequired>
                <FormLabel>Quantity Product</FormLabel>
                <Input {...register("qty")} type="number" name="qty" />
              </FormControl>
              <FormControl id="image" isRequired>
                <FormLabel>Image Product</FormLabel>
                <Input
                  width={"full"}
                  height={"auto"}
                  padding={"2"}
                  {...register("image")}
                  type="file"
                  name="image"
                  accept="image/*"
                  alignItems={"center"}
                  border={`2px dashed ${color.MAIN_COLOR}`}
                  p={"50px"}
                  _hover={{ cursor: "pointer" }}
                  onChange={({ target: { files } }) => {
                    if (files) {
                      setPreviewProductImage(URL.createObjectURL(files[0]));
                    }
                  }}
                />
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  isLoading={isLoading ? true : false}
                  loadingText={"Adding product..."}
                  type={"submit"}
                  size="lg"
                  bg={color.MAIN_COLOR}
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
      <Flex mx={{ base: "auto", md: "0" }} w={{ base: "210px", md: "auto" }} align={{ base: "center", md: "start" }} direction={"column"}>
        <ProductCard products={{ payload: [{ productPrice: parseInt(previewProductPrice), productName: previewProductName, productImage: previewProductImage }] }} />
      </Flex>
    </Flex>
  );
}
