import ProductCard from "@/app/components/productCard";

const getProducts = async () => {
  return await (await fetch(`${process.env.MAIN_URL}/api/products`, { next: { revalidate: 10 } })).json();
};

export default async function page() {
  const products = await getProducts();
  return (
    <>
      <ProductCard products={products} />
      Hello world
    </>
  );
}
