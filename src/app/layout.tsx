"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { base, mainnet } from "wagmi/chains";
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";

const config = getDefaultConfig({
  appName: "Liquidify",
  projectId: process.env.WC_PROJECT_ID || "YOUR_PROJECT_ID",
  chains: [mainnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Liquidify.gg",
//   description: "Convert your NFTs into ERC20s",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={darkTheme({ borderRadius: "small" })}>
            <body className={inter.className}>{children}</body>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </html>
  );
}
