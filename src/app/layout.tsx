import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const j = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hokkah Zone",
  description: "Tabaquería y productos de narguile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR">
      <body className={`${j.className} antialiased`}>{children}</body>
    </html>
  );
}
