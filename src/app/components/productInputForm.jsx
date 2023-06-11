"use client";

import { Flex, Box, FormControl, FormLabel, Input, Stack, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import color from "@/const/color";
import { generateImageName } from "@/utils/generateImageName";
import { uploadImage } from "@/firebase/uploadImage";

const postproduct = async (newProduct) => {
  await fetch(`${process.env.MAIN_URL}/api/products`, {
    method: "POST",
    headers: {
      "API-Key": process.env.API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  })
    .then((res) => res.json())
    .then((res) => res.message)
    .catch((err) => {
      throw err;
    });
};

export default function ProductInputForm() {
  const { register, handleSubmit } = useForm();

  const onSubmitProduct = async (data) => {
    const imageProduct = generateImageName(data.image[0].name);
    await uploadImage(data.image[0], imageProduct);
    const newProduct = { idUser: "usr_001", nameProduct: data.name, priceProduct: data.price, categoryProduct: data.cat, descriptionProduct: data.desc, quantityProduct: data.qty, imageProduct };
    await postproduct(newProduct);
  };

  return (
    <Flex minH={"100vh"} pt={"28"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} px={6}>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <form onSubmit={handleSubmit(onSubmitProduct)}>
            <Stack spacing={4}>
              <FormControl id="name" isRequired>
                <FormLabel>Name Product</FormLabel>
                <Input {...register("name")} type="text" name="name" />
              </FormControl>
              <FormControl id="description" isRequired>
                <FormLabel>Description Product</FormLabel>
                <Input {...register("desc")} type="text" name="desc" />
              </FormControl>
              <FormControl id="category" isRequired>
                <FormLabel>Category Product</FormLabel>
                <Input {...register("cat")} type="text" name="cat" />
              </FormControl>
              <FormControl id="price" isRequired>
                <FormLabel>Price Product</FormLabel>
                <Input {...register("price")} type="number" name="price" />
              </FormControl>
              <FormControl id="quantity" isRequired>
                <FormLabel>Quantity Product</FormLabel>
                <Input {...register("qty")} type="number" name="qty" />
              </FormControl>
              <FormControl id="image" isRequired>
                <FormLabel>Image Product</FormLabel>
                <Input width={"full"} height={"auto"} padding={"2"} {...register("image")} type="file" name="image" accept="image/*" />
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type={"submit"}
                  loadingText="Submitting"
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
    </Flex>
  );
}
