import ProductCard from "@/app/components/productCard";

export default async function page() {
  const products = await fetch(`${process.env.MAIN_URL}/api/products`, { cache: "no-cache" });

  console.log(await products.json());

  return (
    <>
      {/* <ProductCard products={await products.json()} /> */}
      <p>Main page</p>
    </>
  );
}
