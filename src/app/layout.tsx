import type { Metadata } from "next";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { LoaderIcon, Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fluidly",
  description: "Convert your NFTs into ERC20s",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "",
          style: {
            padding: "5px",
            color: "white",
            backgroundColor: "#0d0d0d",
          },
        }}
      />
      <link rel="icon" href="/icon.png" />
      <body className={inter.className}>
        <Providers>
          <div className="">
            <Navbar />

            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
