import slugify from "slugify";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import Navbar from "./Navbar";
import { fetchGET } from "@/useFetch/fetchGET";
import { authOptions } from "@/utils/authOptions";
import { UserProvider } from "@/context/UserContext";

export default async function AuthCheck({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <>
        <Navbar />
        <main className="root">{children}</main>
      </>
    );
  }

  const {
    payload: { userId },
  } = await fetchGET(`/api/id/${slugify(session.user.name, { lower: true })}`);

  session.user.id = userId;

  return (
    <UserProvider user={session.user}>
      <Navbar />
      <main className="root">{children}</main>
    </UserProvider>
  );
}
