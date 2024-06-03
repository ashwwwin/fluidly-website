"use client";

import {
  BookCheckIcon,
  Droplet,
  HelpCircle,
  ImageIcon,
  ImagesIcon,
  Info,
  InfoIcon,
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

const Navbar = ({ page }: { page: string }) => {
  return (
    <>
      <div className="w-full z-[99999] bg-black shadow-2xl xs:items-center xs:justify-center border-b-[1.75px] border-white border-opacity-10 fixed items-center px-3 py-3.5 flex">
        <a className="flex cursor-default items-center" href="/">
          <img src="/icon.png" className="h-[35px] mr-2 select-none" />
          <img
            src="/logo.png"
            className="h-[30px] select-none pointer-events-none"
          />
        </a>
        <div className="flex flex-grow xs:hidden" />
        <div className="flex mr-1.5 items-center gap-x-3 xs:hidden">
          <a
            href="https://x.com/Liquidify_gg"
            className="outline-none flex items-center bg-white text-white duration-[150ms] rounded-md py-2 bg-opacity-0 transition-all px-3 rounded-md select-none text-opacity-50 hover:text-opacity-100 hover:bg-opacity-[7.5%]"
          >
            <img
              src="/x.png"
              className="h-[15px] opacity-50 pointer-events-none"
            />
          </a>
          <div className="bg-white h-full px-[1px] rounded-full opacity-10 py-[12.5px]" />

          <div className="flex gap-x-2.5">
            <a
              href="/faq"
              className={
                "outline-none flex items-center bg-white text-white duration-[150ms] rounded-md py-1 bg-opacity-0 transition-all pr-3 pl-2 rounded-md select-none " +
                (page == "faq"
                  ? " text-opacity-100 bg-opacity-10"
                  : " text-opacity-50 hover:text-opacity-100 hover:bg-opacity-[7.5%]")
              }
            >
              <HelpCircle className="h-[15px] mr-1" /> FAQ
            </a>
            <a
              href="/"
              className={
                "outline-none flex items-center bg-white text-white duration-[150ms] rounded-md py-1 bg-opacity-0 transition-all pr-3 pl-2 rounded-md select-none " +
                (page == "collection"
                  ? " text-opacity-100 bg-opacity-10"
                  : " text-opacity-50 hover:text-opacity-100 hover:bg-opacity-[7.5%]")
              }
            >
              <BookCheckIcon className="h-[15px] mr-1" /> Collections
            </a>
            <div className="flex flex-col group relative">
              <button
                className={
                  "outline-none flex z-[10000] items-center bg-white text-white duration-[150ms] rounded-md py-1 bg-opacity-0 transition-all pr-3 pl-2 rounded-md select-none " +
                  (page == "manage" || page == "liquidify"
                    ? " text-opacity-100 bg-opacity-10"
                    : " text-opacity-50 group-hover:text-opacity-100 group-hover:bg-opacity-[7.5%]")
                }
              >
                <Droplet className="h-[15px] mr-1" />
                Liquidify
              </button>
              <div className="absolute pt-[38px] w-full hidden group-hover:block">
                <div className="bg-[#0D0D0D] rounded-lg text-sm p-1 select-none flex flex-col gap-y-1 text-white">
                  <a
                    href="/manage"
                    className={
                      "outline-none flex items-center bg-white text-white duration-[150ms] rounded-md py-1 bg-opacity-0 transition-all pr-3 pl-2 rounded-md select-none " +
                      (page == "manage"
                        ? " text-opacity-100 bg-opacity-10"
                        : " text-opacity-50 hover:text-opacity-100 hover:bg-opacity-[7.5%]")
                    }
                  >
                    <PencilRuler className="h-[15px] mr-1" /> Manage
                  </a>
                  <a
                    href="/create"
                    className={
                      "outline-none flex items-center bg-white text-white duration-[150ms] rounded-md py-1 bg-opacity-0 transition-all pr-3 pl-2 rounded-md select-none " +
                      (page == "liquidify"
                        ? " text-opacity-100 bg-opacity-10"
                        : " text-opacity-50 hover:text-opacity-100 hover:bg-opacity-[7.5%]")
                    }
                  >
                    <StarsIcon className="h-[15px] mr-1" /> Create
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white h-full px-[1px] rounded-full opacity-10 py-[12.5px]" />
          <div className="flex flex-col group">
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
                    <div>
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
                            <button
                              className="flex items-center"
                              onClick={openAccountModal}
                              type="button"
                            >
                              <Wallet className="h-[15px] mr-1" />
                              {account.displayName}
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
      </div>
    </>
  );
};

export default Navbar;
