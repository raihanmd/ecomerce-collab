import "@/style/global.css";
import { Providers } from "@/app/providers";
import { Navbar } from "@/app/components/navbar";

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
