"use client";

import {
  BookCheckIcon,
  Droplet,
  HelpCircle,
  Info,
  Wallet,
  X,
} from "lucide-react";
import Image from "next/image";
import AboutPage from "../components/AboutPage";
import { useEffect, useState } from "react";
import CollectionPage from "../components/CollectionPage";
import LiquidifyPage from "../components/LiquidifyPage";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import FaqPage from "@/components/FaqPage";

export default function Home() {
  const [page, setPage] = useState<
    "about" | "collection" | "liquidify" | "faq"
  >("collection");
  const [collections, setCollections] = useState<any>(undefined);

  useEffect(() => {
    const fetchCollections = async () => {
      const response = await fetch("/api/collections");

      const data = await response.json();
      console.log(data);
      setCollections(data);
    };

    fetchCollections().catch(console.error);

    // Cleanup function to prevent effect from running more than once
    return () => {};
  }, []);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center">
        <link rel="icon" href="/icon.png" />
        <title>Liquidify.gg</title>

        <div className="w-full items-center px-3 shadow-xl border-b-2 border-white border-opacity-5 py-3.5 flex bg-white bg-opacity-5">
          <img src="/icon.png" className="h-[35px] select-none" />
          <img
            src="/logo.png"
            className="h-[30px] select-none pointer-events-none"
          />
          <div className="flex flex-grow" />
          <div className="flex mr-1.5 items-center gap-x-5">
            <button
              onClick={() => {
                setPage("about");
              }}
              className={
                "outline-none flex items-center bg-white text-white rounded-sm py-1 bg-opacity-0 transition-all px-3 rounded-md select-none " +
                (page == "about"
                  ? " text-opacity-100"
                  : " text-opacity-50 hover:text-opacity-100")
              }
            >
              <Info className="h-[15px] mr-1" /> About
            </button>
            <button
              onClick={() => {
                setPage("faq");
              }}
              className={
                "outline-none flex items-center bg-white text-white rounded-sm py-1 bg-opacity-0 transition-all px-3 rounded-md select-none " +
                (page == "faq"
                  ? " text-opacity-100"
                  : " text-opacity-50 hover:text-opacity-100")
              }
            >
              <HelpCircle className="h-[15px] mr-1" /> FAQ
            </button>
            <button
              onClick={() => {
                setPage("collection");
              }}
              className={
                "outline-none flex items-center bg-white text-white rounded-sm py-1 bg-opacity-0 transition-all px-3 rounded-md select-none " +
                (page == "collection"
                  ? " text-opacity-100"
                  : " text-opacity-50 hover:text-opacity-100")
              }
            >
              <BookCheckIcon className="h-[15px] mr-1" /> Collections
            </button>
            <button
              onClick={() => {
                setPage("liquidify");
              }}
              className={
                "outline-none flex items-center bg-white text-white rounded-sm py-1 bg-opacity-0 transition-all px-3 rounded-md select-none " +
                (page == "liquidify"
                  ? " text-opacity-100"
                  : " text-opacity-50 hover:text-opacity-100")
              }
            >
              <Droplet className="h-[15px] mr-1" />
              Liquidify
            </button>
            <button className="outline-none text-white flex items-center bg-white mr-2 rounded-sm py-1 bg-opacity-0 transition-all hover:text-opacity-100 px-3 rounded-md select-none text-opacity-50">
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  authenticationStatus,
                  mounted,
                }) => {
                  // Note: If your app doesn't use authentication, you
                  // can remove all 'authenticationStatus' checks
                  const ready = mounted && authenticationStatus !== "loading";
                  const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                      authenticationStatus === "authenticated");

                  return (
                    <div
                      {...(!ready && {
                        "aria-hidden": true,
                        style: {
                          opacity: 0,
                          pointerEvents: "none",
                          userSelect: "none",
                        },
                      })}
                    >
                      {(() => {
                        if (!connected) {
                          return (
                            <>
                              <button
                                onClick={openConnectModal}
                                className="flex items-center"
                                type="button"
                              >
                                <Wallet className="h-[15px] mr-1" />
                                Wallet
                              </button>
                            </>
                          );
                        }

                        if (chain.unsupported) {
                          return (
                            <button
                              className="flex items-center"
                              onClick={openChainModal}
                              type="button"
                            >
                              <Wallet className="h-[15px] mr-1" />
                              Wrong network
                            </button>
                          );
                        }

                        return (
                          <div style={{ display: "flex", gap: 12 }}>
                            {/* <button
                          onClick={openChainModal}
                          style={{ display: "flex", alignItems: "center" }}
                          type="button"
                        >
                          {chain.hasIcon && (
                            <div
                              style={{
                                background: chain.iconBackground,
                                width: 12,
                                height: 12,
                                borderRadius: 999,
                                overflow: "hidden",
                                marginRight: 4,
                              }}
                            >
                              {chain.iconUrl && (
                                <img
                                  alt={chain.name ?? "Chain icon"}
                                  src={chain.iconUrl}
                                  style={{ width: 12, height: 12 }}
                                />
                              )}
                            </div>
                          )}
                          {chain.name}
                        </button> */}

                            <button
                              className="flex items-center"
                              onClick={openAccountModal}
                              type="button"
                            >
                              <Wallet className="h-[15px] mr-1" />
                              {account.displayName}
                              {/* {account.displayBalance
                            ? ` (${account.displayBalance})`
                            : ""} */}
                            </button>
                          </div>
                        );
                      })()}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
            </button>
          </div>
        </div>

        <div className="flex items-center flex-col gap-y-5 h-full mx-5 mt-5 opacity-80">
          {page == "about" && (
            <>
              <AboutPage />
            </>
          )}
          {page == "faq" && (
            <>
              <FaqPage />
            </>
          )}
          {page == "collection" && (
            <>
              <CollectionPage collections={collections} />
            </>
          )}
          {page == "liquidify" && (
            <>
              <LiquidifyPage />
            </>
          )}
        </div>
      </main>
    </>
  );
}
