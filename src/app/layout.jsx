import "@/style/global.css";
import AuthCheck from "./components/AuthCheck";
import { Providers } from "./providers";
import NextAuthSessionProvider from "../providers/sessionProvider";

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
            <AuthCheck>{children}</AuthCheck>
          </NextAuthSessionProvider>
        </Providers>
      </body>
    </html>
  );
}
