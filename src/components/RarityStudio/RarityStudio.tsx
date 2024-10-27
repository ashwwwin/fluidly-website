"use client";

import {
  CandlestickChart,
  Crown,
  HelpCircle,
  Info,
  Leaf,
  LucideMousePointerClick,
  PieChart,
  Plug,
} from "lucide-react";
import React, { useState } from "react";
import "../../app/globals.css";

const RarityStudio = () => {
  const [tab, setTab] = useState<
    | "faq"
    | "about"
    | "token"
    | "wrapUnwrap"
    | "tiers"
    | "royalties"
    | "supportedNetworks"
    | "uniswapV2Guide"
    | "uniswapV3Guide"
  >("faq");

  return (
    <>
      <div className="w-full flex">
        <div className="left-0 -mt-10 gap-y-2 pr-[18px] pt-[35px] pl-[18px] text-white flex bg-white bg-opacity-5 flex-col w-[250px] max-w-[250px] min-w-[250px] fixed min-h-[100vh] max-h-[100vh]">
          <span className="font-mono text-xs opacity-50 select-none pointer-events-none uppercase">
            Stages
          </span>
          <div
            onClick={() => {
              setTab("faq");
            }}
            className={
              "flex items-center text-opacity-80 text-white select-none bg-white px-3 py-1 rounded-md cursor-pointer transition-all duration-[100ms] " +
              (tab == "faq"
                ? "bg-opacity-10"
                : "bg-opacity-5 hover:bg-opacity-[7.5%]")
            }
          >
            <HelpCircle className="h-[15px] mr-0.5" />
            FAQ
          </div>
          <div
            onClick={() => {
              setTab("about");
            }}
            className={
              "flex items-center text-opacity-80 text-white select-none bg-white px-3 py-1 rounded-md cursor-pointer transition-all duration-[100ms] " +
              (tab == "about"
                ? "bg-opacity-10"
                : "bg-opacity-5 hover:bg-opacity-[7.5%]")
            }
          >
            <Info className="h-[15px] mr-0.5" />
            Overview
          </div>
          <div
            onClick={() => {
              setTab("token");
            }}
            className={
              "flex items-center text-opacity-80 text-white select-none bg-white px-3 py-1 rounded-md cursor-pointer transition-all duration-[100ms] " +
              (tab == "token"
                ? "bg-opacity-10"
                : "bg-opacity-5 hover:bg-opacity-[7.5%]")
            }
          >
            <PieChart className="h-[15px] mr-0.5" />
            $LIQ
          </div>
        </div>
        <div className="flex flex-col mb-12 w-full justify-left min-w-[calc(100vw-50px)] pl-[255px]">
         
        </div>
      </div>
    </>
  );
};

export default RarityStudio;
