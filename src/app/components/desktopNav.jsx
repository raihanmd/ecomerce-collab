import useSWR from "swr";
import { Link, Popover, PopoverContent, PopoverTrigger, Stack, Text, Box } from "@chakra-ui/react";

import color from "@/const/color";

const fetcher = (url) => fetch(url).then((res) => res.json());

const DesktopNav = () => {
  const { data, error, isLoading } = useSWR("/api/category", fetcher);

  const linkColor = "gray.600";
  const linkHoverColor = "gray.800";
  const popoverContentBgColor = "white";

  return (
    <Stack direction={"row"} spacing={4} align={"center"}>
      <Box key={"Categories"}>
        <Popover trigger={"hover"} placement={"bottom-start"}>
          <PopoverTrigger>
            <Text
              p={2}
              fontSize={"sm"}
              fontWeight={500}
              color={linkColor}
              _hover={{
                cursor: "pointer",
                textDecoration: "none",
                color: linkHoverColor,
              }}
            >
              Categories
            </Text>
          </PopoverTrigger>
          {isLoading ? (
            <PopoverContent border={0} boxShadow={"lg"} bg={popoverContentBgColor} p={3} rounded={"xl"} minW={"xs"} color={color.MAIN_COLOR}>
              <Stack direction={"row"} align={"center"} color={color.MAIN_COLOR} py={2} px={3} rounded={"md"}>
                <Text fontSize={"sm"} transition={"all .3s ease"} fontWeight={200}>
                  Loading...
                </Text>
              </Stack>
            </PopoverContent>
          ) : null}
          {data ? (
            <PopoverContent border={0} boxShadow={"lg"} bg={popoverContentBgColor} p={3} rounded={"xl"} minW={"xs"} color={color.MAIN_COLOR}>
              {data.payload.map((child) => (
                <DesktopSubNav key={child.name} {...child} />
              ))}
            </PopoverContent>
          ) : null}
        </Popover>
      </Box>
    </Stack>
  );
};

const DesktopSubNav = ({ name }) => {
  return (
    <Link href={`/category/${name.toLowerCase()}`} role={"group"} display={"block"} py={2} px={3} rounded={"md"} _hover={{ bg: "blue.50" }}>
      <Stack direction={"row"} align={"center"} color={color.MAIN_COLOR}>
        <Text fontSize={"sm"} transition={"all .3s ease"} _groupHover={{ color: "blue.500" }} fontWeight={200}>
          {name}
        </Text>
      </Stack>
    </Link>
  );
};

export default DesktopNav;
