import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { LoaderIcon, Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import type { Metadata } from "next";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fluidly.app",
  description:
    "The simplest way to create sophisticated artcoins. Convert your NFTs into ERC20 tokens and back on 5+ chains.",
  openGraph: {
    type: "website",
    url: "https://fluidly.app",
    title: "Fluidly.app",
    description:
      "The simplest way to create sophisticated artcoins. Convert your NFTs into ERC20 tokens and back on 5+ chains.",
    images: [
      {
        url: "https://fluidly.app/icon.png",
        width: 256,
        height: 256,
        alt: "Fluidly.app",
      },
    ],
    siteName: "Fluidly.app",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        defer
        src="https://umami.winzylabs.com/script.js"
        data-website-id="c7180501-e49e-409f-9f68-a401326b2787"
      />
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
