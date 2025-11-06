import "./globals.css";
import "@mysten/dapp-kit/dist/index.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Providers from "@/app/providers";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Nextjs Starter Template",
    template: "%s | Nextjs Starter Template",
  },
  description: "Nextjs 14.2.1 + Tailwind CSS starter template",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
