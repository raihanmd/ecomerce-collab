import { Suspense } from "react";
import { notFound } from "next/navigation";

import { fetchGET } from "@/useFetch/fetchGET";
import BreadcumbComponent from "@/app/components/breadcumb";
import ProductDetails from "./components/productDetails";
import LoadingProductDetail from "./loading";

export default async function Page({ params }) {
  const detailProduct = await fetchGET(`/api/${params.userName}/${params.slugProduct}`, { component: "server" });

  if (detailProduct.statusCode !== 200) {
    notFound();
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
