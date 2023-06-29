import { Suspense } from "react";

import { fetchGET } from "@/useFetch/fetchGET";
import LoadingProductDetail from "./components/loadingProductDetail";
import Breadcumb from "@/app/components/breadcumb";

export default async function page({ params }) {
  const detailProduct = await fetchGET(`/api/${params.userName}/${params.slugProduct}`, { component: "server" });

  return (
    <Suspense fallback={LoadingProductDetail}>
      <Breadcumb />
      {JSON.stringify(detailProduct.payload)};
    </Suspense>
  );
}
