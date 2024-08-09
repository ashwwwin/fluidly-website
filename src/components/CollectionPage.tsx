"use client";

import {
  ArrowLeftCircleIcon,
  ArrowUpRightSquareIcon,
  Blocks,
  BookCheckIcon,
  ChevronLeft,
  Copy,
  Info,
  Lightbulb,
  LoaderIcon,
  LucideLayoutGrid,
  RefreshCcw,
  Verified,
  X,
} from "lucide-react";
import React from "react";
import "../app/globals.css";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

const LiquidifyMutatio = "0xF9d450590b238CDA15E570F924C9B9fA577A9872";

const CollectionPage = ({ collections }: { collections: any }) => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [currentView, setCurrentView] = useState<"explore" | "launching">(
    "explore"
  );
  const account = useAccount();

  useEffect(() => {
    if (!account?.address) return;
    setWalletAddress(account.address);
  }, [account?.address]);

  return (
    <>
      <div className="flex flex-col w-screen">
        {collections?.liquidNfts.length > 0 && (
          <>
            <div className="flex text-white gap-3.5 xs:flex-col xs:items-center xs:pb-[100px] flex-wrap min-w-screen mx-10">
              <div className="flex mb-3 flex w-full items-center justify-between text-white">
                <div className="flex gap-x-8">
                  <button
                    onClick={() => {
                      setCurrentView("explore");
                    }}
                    className="group transform-gpu outline-none transition-all duration-[1350ms] flex flex-col items-center justify-center select-none"
                  >
                    <div
                      className={
                        "flex text-xl items-center justify-center group-active:text-opacity-100 transition-all duration-[150ms] py-1 mt-1 select-none font-medium text-white " +
                        (currentView == "explore"
                          ? "text-opacity-100"
                          : "bg-opacity-30 transform-gpu group-hover:scale-[1] group-hover:w-[90%] text-opacity-50")
                      }
                    >
                      Explore
                    </div>
                    <div
                      className={
                        "bg-white scale-[0] group-active:bg-opacity-100 group-active:w-[95%] py-[1px] bg-black transition-all duration-[300ms] w-[0px] rounded-full " +
                        (currentView == "explore"
                          ? "scale-[1] w-[100%] bg-opacity-100"
                          : "bg-opacity-30 transform-gpu group-hover:scale-[1] group-hover:w-[90%]")
                      }
                    />
                  </button>

                  <button
                    onClick={() => {
                      setCurrentView("launching");
                    }}
                    className="group transform-gpu outline-none transition-all duration-[1350ms] flex flex-col items-center justify-center select-none"
                  >
                    {/* <div
                      className={
                        "flex text-xl items-center justify-center group-active:text-opacity-100 transition-all duration-[150ms] py-1 mt-1 select-none font-medium text-white " +
                        (currentView == "launching"
                          ? "text-opacity-100"
                          : "bg-opacity-30 transform-gpu group-hover:scale-[1] group-hover:w-[90%] text-opacity-50")
                      }
                    >
                      Minting
                    </div> */}
                    <div
                      className={
                        "bg-white scale-[0] group-active:bg-opacity-100 group-active:w-[95%] py-[1px] bg-black transition-all duration-[300ms] w-[0px] rounded-full " +
                        (currentView == "launching"
                          ? "scale-[1] w-[100%] bg-opacity-100"
                          : "bg-opacity-30 transform-gpu group-hover:scale-[1] group-hover:w-[90%]")
                      }
                    />
                  </button>
                </div>

                {/* <button className="px-3 py-1.5 xs:hidden">Launchpad</button> */}
              </div>
              {currentView == "launching" &&
                collections?.liquidNfts?.map((collection: any) => {
                  if (!collection?.minting) {
                    return;
                  }

                  return (
                    <>
                      <div className="group flex w-fit xs:w-full w-[300px] flex flex-col hover:-translate-y-[1.5px] rounded-xl transition-all duration-[200ms]">
                        <a
                          href={`/${collection.network.toLowerCase()}/${
                            collection.liquidifyContract
                          }`}
                          className="flex flex-grow bg-white p-[4.5px] w-[300px] transition-all duration-[55ms] hover:bg-opacity-[11.5%] cursor-pointer select-none flex flex-grow w-full bg-opacity-10 rounded-lg select-none w-full"
                        >
                          <div className="h-[169px] w-[189px] max-w-[189px] min-w-[169px] min-h-[169px] max-h-[169px] overflow-hidden ">
                            <img
                              className="transition-all duration-[200ms] opacity-80 xs:mr-3 h-[169px] w-[189px] max-w-[189px] min-w-[169px] min-h-[169px] max-h-[169px] bg-white bg-opacity-10 object-cover rounded-md outline-none overflow-hidden pointer-events-none"
                              src={collection.nftProjectImage || "/temp.png"}
                            />
                          </div>
                          <div className="flex flex-col w-full ml-2.5 mt-1 ">
                            <span className="block xs:hidden flex items-center truncate ... max-w-[175px] sm:w-[175px]">
                              {collection.nftName || collection.tokenName}
                            </span>
                            <span className="hidden xs:block flex items-center">
                              <span className="flex items-center">
                                {collection.nftName || collection.tokenName}
                                {collection.liquidifyVerified && (
                                  <>
                                    <Verified className="h-[13.9px] ml-0" />
                                  </>
                                )}
                              </span>
                            </span>
                            {/* <span>{collection.tokenName}</span> */}
                            <div className="flex flex-col gap-y-1 mt-1">
                              <span className="text-xs truncate ... opacity-50">
                                Conversion:{" "}
                                {new Intl.NumberFormat().format(
                                  collection.tokensPerNft
                                )}
                              </span>
                              <span className="text-xs truncate ... opacity-50">
                                Ticker: {collection.tokenSymbol}
                              </span>
                              <span className="text-xs truncate ... opacity-50">
                                Supply: 10,000
                              </span>
                              <span className="text-xs truncate ... opacity-50">
                                Mint: {collection.mintCost} ETH
                              </span>
                              <span className="text-xs truncate ... opacity-50">
                                Chain: {collection.network}
                              </span>
                              <span className="text-xs truncate ... opacity-50">
                                Time left: 17 hours 3 mins
                              </span>
                            </div>
                            <div className="flex flex-grow" />
                            <div className="rounded-full flex items-center w-[200px] py-1 bg-white bg-opacity-10 relative mb-2">
                              <div className="h-full w-[20%] bg-blue-500 opacity-80 absolute rounded-full" />
                            </div>
                          </div>
                        </a>
                      </div>
                    </>
                  );
                })}
              {currentView == "explore" &&
                collections?.liquidNfts?.map((collection: any) => {
                  if (!collection?.pairEnabled) {
                    return;
                  }

                  return (
                    <>
                      <div className="group flex w-fit xs:w-full flex flex-col hover:-translate-y-[1.5px] rounded-xl transition-all duration-[200ms]">
                        <a
                          href={`/${collection.network.toLowerCase()}/${
                            collection.liquidifyContract
                          }`}
                          className="flex flex-grow bg-white xs:w-full sm:w-[190px] p-[4.5px] sm:max-w-[190px] transition-all duration-[55ms] hover:bg-opacity-[11.5%] cursor-pointer select-none flex flex-grow w-full bg-opacity-10 rounded-t-lg select-none w-full"
                        >
                          <div className="flex flex-col xs:flex-row items-center justify-center">
                            <div className="h-[169px] w-[189px] max-w-[189px] min-w-[169px] min-h-[169px] max-h-[169px] overflow-hidden ">
                              <img
                                className="transition-all duration-[200ms] opacity-80 xs:mr-3 h-[169px] w-[189px] max-w-[189px] min-w-[169px] min-h-[169px] max-h-[169px] bg-white bg-opacity-10 object-cover rounded-md outline-none overflow-hidden pointer-events-none"
                                src={collection.nftProjectImage || "/temp.png"}
                              />
                            </div>
                            <div className="text-left w-full flex max-w-[175px] my-2 items-start justify-start">
                              <div className="flex flex-col w-full xs:ml-3">
                                <span className="block xs:hidden flex items-center truncate ... max-w-[175px] sm:w-[175px]">
                                  {collection.nftName || collection.tokenName}
                                </span>
                                <span className="hidden xs:block flex items-center">
                                  <span className="flex items-center">
                                    {collection.nftName || collection.tokenName}
                                    {collection.liquidifyVerified && (
                                      <>
                                        <Verified className="h-[13.9px] ml-0" />
                                      </>
                                    )}
                                  </span>
                                </span>
                                {/* <span>{collection.tokenName}</span> */}
                                <span className="text-xs truncate ... opacity-70">
                                  {new Intl.NumberFormat().format(
                                    collection.tokensPerNft
                                  )}{" "}
                                  ${collection.tokenSymbol}
                                </span>
                                <span className="text-xs mb-1 truncate ... opacity-50 mt-0.5">
                                  Chain: {collection.network}
                                </span>
                              </div>
                            </div>
                          </div>
                        </a>
                        <div className="flex w-full">
                          <a
                            href={`https://opensea.io/assets/${collection.network.toLowerCase()}/${
                              collection.nftAddress
                            }`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex bg-white rounded-bl-lg w-full h-[36px] transition-all duration-[55ms] px-3.5 items-center justify-center hover:bg-opacity-[11.5%] cursor-pointer select-none flex bg-opacity-10 select-none"
                          >
                            <img
                              src="/opensea.png"
                              className="min-h-[15px] transition-all shadow-xl group-hover:shadow-none min-w-[15px] max-h-[15px] max-w-[15px] rounded-md overflow-none"
                            />
                          </a>
                          <a
                            href={`${
                              collection.network == "Ethereum"
                                ? "https://etherscan.io/token/"
                                : collection.network === "Base" &&
                                  collection.liquidifyContract ==
                                    LiquidifyMutatio
                                ? "https://basescan.org/address/"
                                : collection.network === "Base"
                                ? "https://basescan.org/token/"
                                : collection.network === "Polygon"
                                ? "https://polygonscan.com/token/"
                                : collection.network === "Blast"
                                ? "https://blastscan.io/token/"
                                : collection.network === "Arbitrum"
                                ? "https://arbiscan.io/token/"
                                : collection.network === "Optimism"
                                ? "https://optimistic.etherscan.io/token/"
                                : ""
                            }${collection.liquidifyContract}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full group bg-white transition-all duration-[55ms] px-3.5 items-center justify-center hover:bg-opacity-[11.5%] cursor-pointer select-none flex bg-opacity-10 select-none"
                          >
                            <img
                              src="/etherscan.svg"
                              className="min-h-[15px] transition-all shadow-xl group-hover:shadow-none min-w-[15px] max-h-[15px] max-w-[15px] rounded-md overflow-none"
                            />
                          </a>
                          <a
                            href={`https://app.uniswap.org/explore/tokens/${collection.network.toLowerCase()}/${
                              collection?.liquidifyContract
                            }`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full group bg-white rounded-br-lg transition-all duration-[55ms] px-3.5 items-center justify-center hover:bg-opacity-[11.5%] cursor-pointer select-none flex bg-opacity-10 select-none"
                          >
                            <img
                              src="/uniswap.png"
                              className="min-h-[15px] transition-all shadow-xl group-hover:shadow-none min-w-[15px] max-h-[15px] max-w-[15px] rounded-md overflow-none"
                            />
                          </a>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CollectionPage;
