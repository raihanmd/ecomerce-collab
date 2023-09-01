"use client";
import { Suspense } from "react";
import { redirect } from "next/navigation";

import { fetchGET } from "@/useFetch/fetchGET";
import LoadingProductDetail from "./components/loadingProductDetail";
import BreadcumbComponent from "@/app/components/breadcumb";
import ProductDetails from "./components/productDetails";

export default async function Page({ params }) {
  const detailProduct = await fetchGET(`/api/${params.userName}/${params.slugProduct}`, { component: "client" });

  if (detailProduct.statusCode !== 200) {
    redirect("/not-found");
    return null
  }

  return (
    <>
      <Suspense fallback={<LoadingProductDetail />}>
        <BreadcumbComponent />
        <ProductDetails product={detailProduct.payload} />
        <div style={{ marginTop: "4000px" }}></div>
      </Suspense>
    </>
  );
}
