"use client";

import {
  ArrowRightCircle,
  BookCheckIcon,
  ChevronRight,
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
import "./globals.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import CollectionPage from "../components/CollectionPage";
import LiquidifyPage from "../components/LiquidifyPage";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import FaqPage from "@/components/FaqPage";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Lottie from "react-lottie-player";
import GridPattern from "@/components/MagicUI/AnimatedGridPattern";
import { cn } from "@/libs/utils";
import lottieJson from "../components/Lottie.json";
import Particles from "@/components/MagicUI/Particles";

export default function Landing() {
  useEffect(() => {
    window.location.href = "/explore";
  }, []);

  return (
    <>
      <div className="bg-black h-screen w-screen flex items-center justify-center absolute z-[1000]"></div>
      <main className="flex min-h-screen max-h-screen flex-col overflow-y-hidden overflow-x-hidden items-center">
        <link rel="icon" href="/icon.png" />
        <title>Liquidify.gg</title>

        <div className="w-full h-screen max-h-screen">
          {/* <Navbar page="" /> */}

          <div className="flex w-full h-screen opacity-100">
            <div className="flex flex-col bg-opacity-10 border-r-2 border-[#1D1F21] max-w-[650px] z-[100] relative min-w-[550px] p-10">
              <div className="flex">
                <img
                  src="/icon.png"
                  className="h-[35px] w-fit select-none pointer-events-none mr-0.5 -ml-3"
                />
                <img
                  src="/logo.png"
                  className="h-[35px] w-fit select-none pointer-events-none"
                />
              </div>
              <div className="grow" />
              <div className="flex flex-col">
                <span className="text-4xl font-semibold select-none text-white ">
                  Create ERC20 tokens backed by your NFTs.
                </span>
                <div className="mt-5 flex gap-x-3 text-[15.2px]">
                  <a
                    href="/faq"
                    className="rounded-md text-white outline-none select-none bg-gray-600 border border-gray-800 px-6 py-2 opacity-[92.5%] hover:opacity-100 w-fit transition-all duration-200"
                  >
                    Learn more
                  </a>
                  <a
                    href="/explore"
                    className="rounded-md flex group text-white outline-none items-center bg-blue-500 border border-blue-800 px-6 py-2 opacity-[92.5%] hover:opacity-100 w-fit transition-all duration-200"
                  >
                    Explore collections{" "}
                    <ChevronRight className="text-white ml-1 h-[13.8px] -mr-1 group-hover:pl-1 transition-all" />
                  </a>
                </div>
              </div>
              <div className="grow" />
              <div className="flex gap-x-3.5 mt-3.5">
                <div className="flex flex-col bg-white bg-opacity-5 w-[200px] h-[95px] p-2 text-white rounded-lg items-center justify-center flex-col ">
                  <span className="opacity-50 text-sm select-none bg-white bg-opacity-[15%] px-3 rounded-full">
                    Community
                  </span>
                  <div className="flex scale-[0.7] gap-x-5 mt-1 max-h-[50px]">
                    <a
                      href="https://github.com/ashwwwin/liquidify_v3_contracts"
                      target="_blank"
                      className="border-[2px] scale-[0.825] border-white border-opacity-0 group rounded-full cursor-pointer"
                    >
                      <img
                        src="/github.svg"
                        className="h-full select-none pointer-events-none group-hover:opacity-60 opacity-[39%] transition-all"
                      />
                    </a>
                    <a
                      href="https://x.com/Liquidify_gg"
                      target="_blank"
                      className="border-[2px] scale-[0.825] border-white border-opacity-0 group rounded-full cursor-pointer"
                    >
                      <img
                        src="/x.png"
                        className="h-full select-none pointer-events-none group-hover:opacity-60 opacity-[39%] transition-all"
                      />
                    </a>
                    <a
                      href="https://discord.gg/jATKMvu7VW"
                      target="_blank"
                      className="border-[2px] border-white border-opacity-0 group rounded-full cursor-pointer"
                    >
                      <img
                        src="/discord.webp"
                        className="h-full select-none pointer-events-none group-hover:opacity-60 opacity-[39%] transition-all"
                      />
                    </a>
                  </div>
                </div>

                <div className="flex bg-white bg-opacity-5 w-[230px] h-[95px] p-2 text-white rounded-lg items-center justify-center flex-col ">
                  <span className="opacity-50 text-sm select-none bg-white bg-opacity-[15%] px-3 rounded-full">
                    Supported networks
                  </span>
                  <div className="group flex select-none gap-x-2 mt-1 h-[50px] scale-[0.65]">
                    <div className="pointer-events-none border-[2px] border-white border-opacity-30 transition-all min-h-[50px] min-w-[50px] max-w-h-[50px] rounded-full overflow-hidden max-w-[50px] ">
                      <img
                        src="/networks/base.svg"
                        className="h-full select-none w-full"
                      />
                    </div>
                    <div className="pointer-events-none border-[2px] border-white border-opacity-30 transition-all min-h-[50px] min-w-[50px] max-w-h-[50px] rounded-full overflow-hidden max-w-[50px] ">
                      <img
                        src="/networks/optimism.png"
                        className="h-full select-none w-full"
                      />
                    </div>
                    <div className="pointer-events-none border-[2px] border-white border-opacity-30 transition-all min-h-[50px] min-w-[50px] max-w-h-[50px] rounded-full overflow-hidden max-w-[50px] ">
                      <img
                        src="/networks/polygon.png"
                        className="h-full select-none w-full"
                      />
                    </div>
                    <div className="pointer-events-none border-[2px] border-white border-opacity-30 transition-all min-h-[50px] min-w-[50px] max-w-h-[50px] rounded-full overflow-hidden max-w-[50px] ">
                      <img
                        src="/networks/arbitrum.png"
                        className="h-full select-none w-full"
                      />
                    </div>
                    <div className="pointer-events-none border-[2px] border-white border-opacity-30 transition-all min-h-[50px] min-w-[50px] max-w-h-[50px] rounded-full overflow-hidden max-w-[50px] ">
                      <img
                        src="/networks/blast.png"
                        className="h-full select-none w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex grow" />
            <div className="max-h-screen w-full flex items-center justify-center overflow-hidden no-scroll">
              <div className="relative flex h-full w-full overflow-hidden rounded-lg md:shadow-xl">
                <GridPattern className="z-[100]" />
                <div className="absolute opacity-90 bg-gradient-to-br z-[1000] from-transparent via-black  to-black h-full w-full" />
              </div>
              <div className="text-white z-[1000] p-10"></div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
