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
        <MainContent children={children} />
      </CategoriesProvider>
    );
  }

  const {
    payload: { userId, userCity, userCityId },
  } = await fetchGET(`/api/account/${slugify(session.user.name, { lower: true })}`, { component: "server" });

  session.user.id = userId;
  session.user.city = userCity;
  session.user.cityId = userCityId;

  return (
    <CategoriesProvider categories={categories.payload}>
      <UserProvider user={session.user}>
        <MainContent children={children} />
      </UserProvider>
    </CategoriesProvider>
  );
}

const MainContent = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="root">{children}</main>
    </>
  );
};
