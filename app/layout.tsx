// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";

import FloatingListIcon from "@/components/FloatingListIcon";
import FloatingMarketplaceIcon from "@/components/FloatingMarketplaceIcon";
import FloatingLegalIcon from "@/components/FloatingLegalIcon";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dwelzer",
  description: "Hotels, Shortlets, Real Estate, Marketplace & Legal Search",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        <SessionProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />

          {/* Floating icons for pop-ups */}
          <FloatingListIcon />
          <FloatingMarketplaceIcon />
          <FloatingLegalIcon />
        </SessionProvider>
      </body>
    </html>
  );
}
