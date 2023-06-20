import { Suspense } from "react";

import LoadingDetailProduct from "./loading";
import { fetchGET } from "@/useFetch/fetchGET";

export default async function page({ params }) {
  const detailProduct = await fetchGET(`/api/${params.userName}/${params.slugProduct}`);

  return (
    <Suspense fallback={<LoadingDetailProduct />}>
      <>{JSON.stringify(detailProduct.payload)};</>
    </Suspense>
  );
}
