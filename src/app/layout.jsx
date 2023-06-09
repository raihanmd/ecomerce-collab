import "@/style/global.css";
import Navbar from "./components/navbar";
import { Providers } from "./providers";

export const metadata = {
  title: "Lynx Shop",
  description: "E-comerce made by raihanmd.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main className="root">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
