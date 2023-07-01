import { Suspense } from "react";

import ProductCard from "@/app/components/productCard";
import { fetchGET } from "@/useFetch/fetchGET";
import LoadingProduct from "./components/loadingProduct";
import Loading from "./loading";

export default async function page() {
  const products = await fetchGET("/api/products", { component: "server" });

  return (
    <>
      <Suspense fallback={<LoadingProduct />}>
        <ProductCard products={products} />
      </Suspense>
    </>
  );
}
