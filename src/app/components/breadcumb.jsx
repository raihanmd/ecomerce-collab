"use client";

import Link from "next/link";
import unslugify from "@/utils/unslugify";
import { usePathname } from "next/navigation";

import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

export default function Breadcumb() {
  const pathname = usePathname();
  const filteredPath = pathname.split("/").filter((segment) => segment !== "");

  return (
    <>
      {pathname !== "/" ? (
        <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />} fontWeight="medium">
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href={"/"}>
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          {filteredPath.map((path, index) => (
            <BreadcrumbItem key={index} isCurrentPage={index === filteredPath.length - 1}>
              <BreadcrumbLink as={Link} href={`/${path}`}>
                {unslugify(path)}
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      ) : null}
    </>
  );
}
