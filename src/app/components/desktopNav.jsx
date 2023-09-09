import { Suspense } from "react";
import { Link, Popover, PopoverContent, PopoverTrigger, Stack, Text, Box } from "@chakra-ui/react";

import { useCategoriesContext } from "@/context/CategoriesContext";

const DesktopNav = () => {
  const categories = useCategoriesContext();

  return (
    <Stack direction={"row"} spacing={4} align={"center"}>
      <Box key={"Categories"}>
        <Popover trigger={"hover"} placement={"bottom-start"}>
          <PopoverTrigger>
            <Text
              p={2}
              fontSize={"sm"}
              fontWeight={500}
              color={"gray.600"}
              _hover={{
                cursor: "pointer",
                textDecoration: "none",
                color: "gray.800",
              }}
            >
              Categories
            </Text>
          </PopoverTrigger>
          <Suspense fallback={<LoadingPopoverCategories />}>
            <PopoverContent border={0} boxShadow={"lg"} bg={"white"} p={3} rounded={"xl"} minW={"xs"} color={"black"}>
              {categories.map((category) => (
                <DesktopSubNav key={category.name} {...category} />
              ))}
            </PopoverContent>
          </Suspense>
        </Popover>
      </Box>
    </Stack>
  );
};

const DesktopSubNav = ({ name }) => {
  return (
    <Link href={`/category/${name.toLowerCase()}`} role={"group"} display={"block"} py={2} px={3} rounded={"md"} _hover={{ bg: "green.50" }}>
      <Stack direction={"row"} align={"center"} color={"black"}>
        <Text fontSize={"sm"} transition={"all .3s ease"} _groupHover={{ color: "green.500" }} fontWeight={200}>
          {name}
        </Text>
      </Stack>
    </Link>
  );
};

const LoadingPopoverCategories = () => {
  return (
    <PopoverContent border={0} boxShadow={"lg"} bg={"white"} p={3} rounded={"xl"} minW={"xs"} color={"black"}>
      <Stack direction={"row"} align={"center"} color={"black"} py={2} px={3} rounded={"md"}>
        <Text fontSize={"sm"} transition={"all .3s ease"} fontWeight={200}>
          Loading...
        </Text>
      </Stack>
    </PopoverContent>
  );
};

export default DesktopNav;
