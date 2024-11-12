import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const m = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hookah Zone",
  description: "Tabaquería y productos de narguile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${m.className} antialiased`}>
        <Toaster position="top-left" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
