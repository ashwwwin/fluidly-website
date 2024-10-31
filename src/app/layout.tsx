import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { LoaderIcon, Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

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
