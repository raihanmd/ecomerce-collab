import { Navbar } from "./components/navbar";

// const getProducts = async () => {
//   const products = await fetch("https://ecomerce-api-raihanmd.vercel.app/api/products", { next: { revalidate: 60 } });
//   return await products.json();
// };

export default async function Home() {
  // const products = await getProducts();

  return (
    <main className="w-full">
      <Navbar />
      <div>
        Hello wor
        <ul>
          {/* {products.payload.map((p) => (
            <li>
              <button>{p.productName}</button>
            </li>
          ))} */}
        </ul>
      </div>
    </main>
  );
}
