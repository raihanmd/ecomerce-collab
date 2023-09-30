import "@/style/global.css";
import { Providers } from "./providers";
import NextAuthSessionProvider from "../providers/sessionProvider";
import NextTopLoader from "nextjs-toploader";
import AuthCheck from "./components/authCheck";

export const metadata = {
  title: "Lynx Shop",
  description: "E-comerce made by raihanmd.",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NextAuthSessionProvider>
            <AuthCheck>
              <NextTopLoader color={"#000"} showSpinner={false} />
              {children}
            </AuthCheck>
          </NextAuthSessionProvider>
        </Providers>
      </body>
    </html>
  );
}
