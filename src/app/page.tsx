"use client";
import { BookCheckIcon, Droplet, Info, Wallet, X } from "lucide-react";
import Image from "next/image";
import AboutPage from "../components/AboutPage";
import { useState } from "react";
import CollectionPage from "../components/CollectionPage";
import LiquidifyPopUp from "../components/LiquidifyPage";
import LiquidifyPage from "../components/LiquidifyPage";

export default function Home() {
  const [page, setPage] = useState<"about" | "collection" | "liquidify">(
    "collection"
  );

  return (
    <>
      <main className="flex min-h-screen flex-col items-center">
        <link rel="icon" href="/icon.png" />

        <div className="w-full items-center px-3 shadow-xl border-b-2 border-white border-opacity-5 py-3.5 flex bg-white bg-opacity-5">
          <img src="/icon.png" className="h-[35px] select-none mr-3" />
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
            <button className="outline-none flex items-center bg-white mr-2 text-white rounded-sm py-1 bg-opacity-0 transition-all hover:text-opacity-100 px-3 rounded-md select-none text-opacity-50">
              <Wallet className="h-[15px] mr-1" />
              Wallet
            </button>
          </div>
        </div>

        <div className="flex items-center flex-col gap-y-5 h-full mx-5 mt-5 opacity-80">
          {page == "about" && (
            <>
              <AboutPage />
            </>
          )}
          {page == "collection" && (
            <>
              <CollectionPage />
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
