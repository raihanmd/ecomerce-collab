import { Suspense } from "react";

import { fetchGET } from "@/useFetch/fetchGET";
import LoadingProductDetail from "./components/loadingProductDetail";
import BreadcumbComponent from "@/app/components/breadcumb";
import ProductDetails from "./components/productDetails";

export default async function page({ params }) {
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
