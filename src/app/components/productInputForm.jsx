"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Flex, Box, FormControl, FormLabel, Input, Stack, Button, Text } from "@chakra-ui/react";

import color from "@/const/color";
import { uploadImage } from "@/firebase/uploadImage";
import { getImageURL } from "@/firebase/getImageURL";
import { deleteImage } from "@/firebase/deleteImage";
import { useUserContext } from "@/context/UserContext";
import { generateImageName } from "@/utils/generateImageName";

export default function ProductInputForm() {
  const user = useUserContext();

  const { register, handleSubmit } = useForm();
  const [isError, setIsError] = useState(false);

  const onSubmitProduct = async (data) => {
    const imageProduct = generateImageName(data.image[0].name);
    try {
      await uploadImage(data.image[0], imageProduct).catch((err) => {
        throw err;
      });

      const newProduct = {
        userId: user.id,
        productName: data.name,
        productPrice: data.price,
        productCategory: data.cat,
        productDescription: data.desc,
        productQuantity: data.qty,
        productImage: await getImageURL(imageProduct).catch((err) => {
          throw err;
        }),
      };

      await axios
        .post("/api/products", newProduct, {
          headers: {
            "API-Key": "JHsduh78^823njshdUYSdnwu7",
          },
        })
        .then((res) => (window.location.href = "/"))
        .catch((err) => {
          console.log(err);
          throw err;
        });
    } catch (err) {
      await deleteImage(imageProduct);
      setIsError(true);
    }
  };

  return (
    <Flex minH={"100vh"} pt={"10"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} px={6}>
        {isError ? <Text>An error occured.</Text> : null}
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
