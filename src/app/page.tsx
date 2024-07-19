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
  return (
    <>
      <main className="flex min-h-screen max-h-screen flex-col overflow-y-hidden overflow-x-hidden items-center">
        <link rel="icon" href="/icon.png" />
        <title>Liquidify.gg</title>

        <div className="w-full h-screen max-h-screen">
          {/* <Navbar page="" /> */}

          <div className="flex w-full p-5 h-screen opacity-100">
            <div className="flex flex-col bg-[#0E0E0E] max-w-[490px] z-[100] relative w-[50%] p-5 border-2 rounded-xl border-[#222426]">
              <div className="flex flex-col">
                <img
                  src="/logo.png"
                  className="h-[55px] w-fit select-none pointer-events-none"
                />
                <span className="text-white mt-1 select-none text-xl opacity-80">
                  Transform NFTs into ERC20 tokens.
                </span>
              </div>
              <div className="grow" />
              <div className="flex flex-col">
                <span className="text-xl select-none text-white opacity-70 pr-3">
                  Liquidify allows anyone to create ERC20 tokens backed by their
                  NFTs.
                </span>
                <div className="flex gap-x-3 -mt-3 text-[15.2px]">
                  <a
                    href="/faq"
                    className="mt-8 text-white outline-none bg-gradient-to-b select-none from-gray-400 to-gray-600 border border-gray-800 px-6 py-2 opacity-[92.5%] hover:opacity-100 rounded-md font-medium w-fit transition-all duration-200"
                  >
                    Learn more
                  </a>
                  <a
                    href="/collections"
                    className="mt-8 flex text-white outline-none items-center bg-gradient-to-b select-none from-blue-400 to-blue-600 border border-blue-800 px-6 py-2 opacity-[92.5%] hover:opacity-100 rounded-md font-medium w-fit transition-all duration-200"
                  >
                    Explore collections{" "}
                    <ArrowRightCircle className="text-white ml-1 h-[15px] -mr-1" />
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
                      className="border-[2px] border-white border-opacity-0 group rounded-full cursor-pointer"
                    >
                      <img
                        src="/github.svg"
                        className="h-full select-none pointer-events-none group-hover:opacity-60 opacity-[39%] transition-all"
                      />
                    </a>
                    <a
                      href="https://x.com/Liquidify_gg"
                      target="_blank"
                      className="border-[2px] border-white border-opacity-0 group rounded-full cursor-pointer"
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
            <div className="max-h-screen w-full ml-5 flex items-center justify-center overflow-hidden no-scroll">
              {/* <div className="flex items-center w-full justify-center mt-5">
                <Lottie
                  loop
                  animationData={lottieJson}
                  play
                  style={{ width: "35vw" }}
                />
              </div> */}

              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg p-20 md:shadow-xl">
                <Lottie
                  loop
                  animationData={lottieJson}
                  play
                  className="z-[100]"
                  style={{ width: "35vw" }}
                />
              </div>
            </div>
            <Particles
              className="absolute inset-0 z-[-1]"
              quantity={150}
              ease={80}
              color={`#ffffff`}
              refresh
            />
          </div>
        </div>
      </main>
    </>
  );
}
