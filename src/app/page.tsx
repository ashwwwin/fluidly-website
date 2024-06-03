"use client";

import {
  BookCheckIcon,
  Droplet,
  HelpCircle,
  ImageIcon,
  ImagesIcon,
  Info,
  InfoIcon,
  LoaderIcon,
  MousePointerClickIcon,
  PencilRuler,
  StarsIcon,
  Wallet,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import CollectionPage from "../components/CollectionPage";
import LiquidifyPage from "../components/LiquidifyPage";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import FaqPage from "@/components/FaqPage";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [page, setPage] = useState<
    "collection" | "faq" | "liquidify" | "manage"
  >("collection");
  const [loading, setLoading] = useState<boolean>(true);
  const [collections, setCollections] = useState<any>(undefined);

  useEffect(() => {
    const fetchCollections = async () => {
      const response = await fetch("/api/collections/all");

      const data = await response.json();
      console.log(data);
      setCollections(data);
    };

    fetchCollections().catch(console.error);
    setLoading(false);

    // Cleanup function to prevent effect from running more than once
    return () => {};
  }, []);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center">
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
        <title>Liquidify.gg</title>
        <Navbar page="collection" />

        <div className="flex items-center flex-col gap-y-5 h-full mx-5 mt-[85px] opacity-90">
          <CollectionPage collections={collections} />
        </div>

        <div className="xs:block hidden text-white justify-center flex items-center w-full fixed bottom-0 py-3 h-[70px] px-2 bg-black border-t-2 border-white border-opacity-[15%]">
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
                    return (
                      <div style={{ display: "flex", gap: 12 }}>
                        <button
                          className={
                            "flex items-center h-[43px] w-full items-center justify-center hover:opacity-100 transition-all " +
                            (page == "collection"
                              ? "opacity-100"
                              : "opacity-50")
                          }
                          onClick={() => {
                            setPage("collection");
                          }}
                          type="button"
                        >
                          <BookCheckIcon className="h-[35px] mr-1" />
                        </button>

                        <button
                          className={
                            "flex items-center h-[43px] w-full items-center justify-center opacity-50 hover:opacity-100 transition-all"
                          }
                          onClick={() => {
                            if (!connected) return openConnectModal();
                            if (chain.unsupported) return openChainModal();

                            return openAccountModal();
                          }}
                          type="button"
                        >
                          <Wallet className="h-[35px] mr-1" />
                        </button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </main>
      {loading && (
        <>
          <LoaderIcon className="absolute bottom-0 opacity-[35%] right-3.5 bottom-3.5 animate-spin text-white" />
        </>
      )}
    </>
  );
}
