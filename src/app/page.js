// import { Navbar } from "./components/navbar";

const getProducts = async () => {
  const products = await fetch("https://ecomerce-collab-raihanmd.vercel.app/api/products", { next: { revalidate: 10 } });
  return await products.json();
};

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="w-full">
      {/* <Navbar /> */}
      <div>
        <ul>
          {products.payload.map((p) => (
            <li>
              <button>{p.productName}</button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
