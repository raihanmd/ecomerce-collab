import "@/style/global.css";
import { Providers } from "./providers";
import NextAuthSessionProvider from "../providers/sessionProvider";
import NextTopLoader from "nextjs-toploader";
import AuthenticationCheck from "./components/authenticationCheck";

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
            <AuthenticationCheck>
              <NextTopLoader color={"#000"} showSpinner={false} />
              {children}
            </AuthenticationCheck>
          </NextAuthSessionProvider>
        </Providers>
      </body>
    </html>
  );
}
