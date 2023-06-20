import slugify from "slugify";
import { getServerSession } from "next-auth";

import Navbar from "./Navbar";
import { fetchGET } from "@/useFetch/fetchGET";
import { authOptions } from "@/utils/authOptions";
import { UserProvider } from "@/context/UserContext";
import { CategoriesProvider } from "@/context/CategoriesContext";

export default async function AuthCheck({ children }) {
  const categories = await fetchGET("/api/category");
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <CategoriesProvider categories={categories.payload}>
        <Navbar />
        <main className="root">{children}</main>
      </CategoriesProvider>
    );
  }

  const {
    payload: { userId },
  } = await fetchGET(`/api/id/${slugify(session.user.name, { lower: true })}`);

  session.user.id = userId;

  return (
    <CategoriesProvider categories={categories.payload}>
      <UserProvider user={session.user}>
        <Navbar />
        <main className="root">{children}</main>
      </UserProvider>
    </CategoriesProvider>
  );
}
