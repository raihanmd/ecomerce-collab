import { Suspense } from "react";

import Loading from "./loading";
import ProductCard from "@/app/components/productCard";
import { fetchGET } from "@/useFetch/fetchGET";

export default async function page() {
  const products = await fetchGET("/api/products");

  return (
    <Suspense fallback={<Loading />}>
      <ProductCard products={products} />
    </Suspense>
  );
}
