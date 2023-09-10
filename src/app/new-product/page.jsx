"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { redirect } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { AiOutlineFileImage } from "react-icons/ai";
import { Flex, Box, FormControl, FormLabel, Input, Stack, Button, Text, useToast, Alert, AlertIcon, AlertTitle, Select, VisuallyHidden, Icon, chakra, Textarea } from "@chakra-ui/react";

import ProductCard from "@/app/components/productCard";
import { fetchPOST } from "@/useFetch/fetchPOST";
import { uploadImage } from "@/firebase/uploadImage";
import { getImageURL } from "@/firebase/getImageURL";
import { deleteImage } from "@/firebase/deleteImage";
import { useUserContext } from "@/context/UserContext";
import { generateImageName } from "@/utils/generateImageName";
import { useCategoriesContext } from "@/context/CategoriesContext";

export default function page() {
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
  const [previewProductImageName, setPreviewProductImageName] = useState(null);

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

      const blurhashResponse = await fetchPOST("/api/blurhash", { productImage }, { component: "client" });

      if (blurhashResponse.statusCode !== 200) throw new Error();

      const newProduct = {
        userId: user.id,
        productName: data.name,
        productPrice: data.price,
        productCategory: data.cat,
        productDescription: data.desc,
        productQuantity: data.qty,
        productWeight: data.weight,
        productImage,
        blurhash: blurhashResponse.payload.blurhash,
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
      setPreviewProductImageName(null);
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
              <FormControl id="name" isRequired>
                <FormLabel>Name Product</FormLabel>
                <Input
                  {...register("name")}
                  type="text"
                  name="name"
                  value={previewProductName}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (inputValue.length <= 255) {
                      setPreviewProductName(inputValue);
                    }
                  }}
                  maxLength={255}
                />
              </FormControl>
              <FormControl id="description" isRequired>
                <FormLabel>Description Product</FormLabel>
                <Textarea {...register("desc")} type="text" name="desc" maxLength={65535} />
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
                <Input {...register("price")} type="number" name="price" value={previewProductPrice} onChange={(e) => setPreviewProductPrice(parseFloat(e.target.value))} max={999999999999999999} />
              </FormControl>
              <FormControl id="quantity" isRequired>
                <FormLabel>Quantity Product</FormLabel>
                <Input {...register("qty")} type="number" name="qty" max={999999999} />
              </FormControl>
              <FormControl id="quantity" isRequired>
                <FormLabel>Weight Product</FormLabel>
                <Input {...register("weight")} type="number" name="weight" max={999999999} />
              </FormControl>

              <FormControl w={{ sm: "350px", md: "430px" }} id="image" isRequired>
                <FormLabel>Image Product</FormLabel>
                <Flex className="testParent" mt={1} justify="center" px={6} pt={5} pb={6} borderWidth={2} borderStyle="dashed" rounded="md" position={"relative"}>
                  <Stack spacing={1} className="test" direction={previewProductImage ? "row" : "column"} textAlign={"center"} align={"center"} justify={"baseline"}>
                    {previewProductImage ? (
                      <Icon as={AiOutlineFileImage} boxSize={8} />
                    ) : (
                      <Icon boxSize={12} color="gray.400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </Icon>
                    )}
                    <Flex fontSize="sm" color="gray.600" alignItems="center" justify={"center"}>
                      <chakra.label
                        whiteSpace={"nowrap"}
                        maxW={"250px"}
                        htmlFor={"image"}
                        cursor={"pointer"}
                        rounded={"md"}
                        fontSize={"sm"}
                        color={"brand.900"}
                        pos={"relative"}
                        _hover={{
                          color: "brand.400",
                          textDecor: "underline",
                        }}
                      >
                        <Text overflow={"hidden"} textOverflow={"ellipsis"} whiteSpace={"nowrap"}>
                          {previewProductImageName || "Browse and upload a file"}
                        </Text>
                        <VisuallyHidden>
                          <Input
                            id="image"
                            name="image"
                            type="file"
                            accept="image/*"
                            {...register("image")}
                            onChange={({ target: { files } }) => {
                              if (files[0].name) {
                                if (files[0].size > 1000000) {
                                  return toast({
                                    title: "Image size too big.",
                                    position: "top-right",
                                    status: "error",
                                    isClosable: true,
                                  });
                                }
                                setPreviewProductImageName(files[0].name);
                                setPreviewProductImage(URL.createObjectURL(files[0]));
                              }
                            }}
                          />
                        </VisuallyHidden>
                      </chakra.label>
                    </Flex>
                    {previewProductImage ? (
                      <Button
                        position={"absolute"}
                        top={"1.5"}
                        right={"1.5"}
                        onClick={() => {
                          setPreviewProductImage(null);
                          setPreviewProductImageName(null);
                        }}
                        background={"red.500"}
                        size={"xs"}
                        rounded={"full"}
                        p={1}
                        _hover={{ background: "red.300" }}
                      >
                        <Icon as={MdDelete} color={"white"} />
                      </Button>
                    ) : (
                      <Text fontSize="xs" color="gray.500">
                        PNG, JPG, WEBP up to 1MB
                      </Text>
                    )}
                  </Stack>
                </Flex>
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
      <Flex mx={{ base: "auto", md: "0" }} w={{ base: "210px", md: "auto" }} align={{ base: "center", md: "start" }} direction={"column"}>
        <ProductCard products={[{ productPrice: parseInt(previewProductPrice), productName: previewProductName, productImage: previewProductImage }]} preview={true} />
      </Flex>
    </Flex>
  );
}
