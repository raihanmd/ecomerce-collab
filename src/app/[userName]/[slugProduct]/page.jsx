"use client";
import { Suspense } from "react";
import { useRouter } from "next/router";

import { fetchGET } from "@/useFetch/fetchGET";
import LoadingProductDetail from "./components/loadingProductDetail";
import BreadcumbComponent from "@/app/components/breadcumb";
import ProductDetails from "./components/productDetails";

export default async function Page({ params }) {
  const router = useRouter()
  const detailProduct = await fetchGET(`/api/${params.userName}/${params.slugProduct}`, { component: "client" });

  if (detailProduct.statusCode !== 200) {
    router.replace('/404')
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
