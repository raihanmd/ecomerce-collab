import ProductCard from "@/app/components/productCard";
import { fetchGET } from "@/useFetch/fetchGET";

export default async function page() {
  const products = await fetchGET("/api/products");

  return (
    <>
      <ProductCard products={products} />
    </>
  );
}
