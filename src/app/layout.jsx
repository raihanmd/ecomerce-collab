import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import "@/style/global.css";
import { authOptions } from "@/utils/authOptions";
import { Providers } from "./providers";
import Navbar from "./components/Navbar";
import NextAuthSessionProvider from "../providers/sessionProvider";
import { UserProvider } from "@/context/UserContext";
import { fetchGET } from "@/useFetch/fetchGET";
import slugify from "slugify";

export const metadata = {
  title: "Lynx Shop",
  description: "E-comerce made by raihanmd.",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/api/auth/signin");

  const {
    payload: { userId },
  } = await fetchGET(`/api/id/${slugify(session.user.name, { lower: true })}`);

  session.user.id = userId;

  return (
    <html lang="en">
      <body>
        <Providers>
          <NextAuthSessionProvider>
            <UserProvider user={session.user}>
              <Navbar />
              <main className="root">{children}</main>
            </UserProvider>
          </NextAuthSessionProvider>
        </Providers>
      </body>
    </html>
  );
}
