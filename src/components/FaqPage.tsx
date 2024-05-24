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
import "../app/globals.css";
import FaqPage_Faq from "./Docs/Faq";
import FaqPage_About from "./Docs/About";
import FaqPage_WrapUnwrap from "./Docs/WrapUnwrap";
import FaqPage_Tiers from "./Docs/Tiers";
import FaqPage_Royalties from "./Docs/Royalties";
import FaqPage_SupportedNetworks from "./Docs/SupportedNetworks";
import FaqPage_Token from "./Docs/Token";

const FaqPage = () => {
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
            GENERAL
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
          <span className="font-mono text-xs opacity-50 select-none pointer-events-none uppercase mt-5">
            LIQUIDIFY
          </span>
          <div
            onClick={() => {
              setTab("wrapUnwrap");
            }}
            className={
              "flex items-center text-opacity-80 text-white select-none bg-white px-3 py-1 rounded-md cursor-pointer transition-all duration-[100ms] " +
              (tab == "wrapUnwrap"
                ? "bg-opacity-10"
                : "bg-opacity-5 hover:bg-opacity-[7.5%]")
            }
          >
            <LucideMousePointerClick className="h-[15px] mr-0.5" />
            Wrap/Unwrap
          </div>
          <div
            onClick={() => {
              setTab("tiers");
            }}
            className={
              "flex items-center text-opacity-80 text-white select-none bg-white px-3 py-1 rounded-md cursor-pointer transition-all duration-[100ms] " +
              (tab == "tiers"
                ? "bg-opacity-10"
                : "bg-opacity-5 hover:bg-opacity-[7.5%]")
            }
          >
            <Crown className="h-[15px] mr-0.5" />
            Tiers
          </div>
          <div
            onClick={() => {
              setTab("royalties");
            }}
            className={
              "flex items-center text-opacity-80 text-white select-none bg-white px-3 py-1 rounded-md cursor-pointer transition-all duration-[100ms] " +
              (tab == "royalties"
                ? "bg-opacity-10"
                : "bg-opacity-5 hover:bg-opacity-[7.5%]")
            }
          >
            <Leaf className="h-[15px] mr-0.5" />
            Royalties
          </div>
          <div
            onClick={() => {
              setTab("supportedNetworks");
            }}
            className={
              "flex items-center text-opacity-80 text-white select-none bg-white px-3 py-1 rounded-md cursor-pointer transition-all duration-[100ms] " +
              (tab == "supportedNetworks"
                ? "bg-opacity-10"
                : "bg-opacity-5 hover:bg-opacity-[7.5%]")
            }
          >
            <Plug className="h-[15px] mr-0.5 rotate-[45deg]" />
            Supported networks
          </div>
          <span className="font-mono text-xs opacity-50 select-none pointer-events-none uppercase mt-5">
            CREATE A LIQUIDITY POOL
          </span>
          <div
            onClick={() => {
              setTab("uniswapV2Guide");
            }}
            className={
              "flex items-center text-opacity-80 text-white select-none bg-white px-3 py-1 rounded-md cursor-pointer transition-all duration-[100ms] " +
              (tab == "uniswapV2Guide"
                ? "bg-opacity-10"
                : "bg-opacity-5 hover:bg-opacity-[7.5%]")
            }
          >
            <CandlestickChart className="h-[15px] mr-0.5" />
            Uniswap v2
          </div>
          <div
            onClick={() => {
              setTab("uniswapV3Guide");
            }}
            className={
              "flex items-center text-opacity-80 text-white select-none bg-white px-3 py-1 rounded-md cursor-pointer transition-all duration-[100ms] " +
              (tab == "uniswapV3Guide"
                ? "bg-opacity-10"
                : "bg-opacity-5 hover:bg-opacity-[7.5%]")
            }
          >
            <PieChart className="h-[15px] mr-0.5" />
            Uniswap v3
          </div>
        </div>
        <div className="flex flex-col mb-12 w-full justify-left min-w-[100vw] pl-[275px]">
          {tab == "faq" && (
            <>
              <FaqPage_Faq />
            </>
          )}
          {tab == "about" && (
            <>
              <FaqPage_About />
            </>
          )}
          {tab == "token" && (
            <>
              <FaqPage_Token />
            </>
          )}
          {tab == "wrapUnwrap" && (
            <>
              <FaqPage_WrapUnwrap />
            </>
          )}
          {tab == "tiers" && (
            <>
              <FaqPage_Tiers />
            </>
          )}
          {tab == "royalties" && (
            <>
              <FaqPage_Royalties />
            </>
          )}
          {tab == "supportedNetworks" && (
            <>
              <FaqPage_SupportedNetworks />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FaqPage;
