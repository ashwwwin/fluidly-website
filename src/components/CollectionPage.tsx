"use client";

import {
  ArrowLeftCircleIcon,
  ArrowUpRightSquareIcon,
  Blocks,
  BookCheckIcon,
  ChevronLeft,
  Copy,
  Info,
  RefreshCcw,
  Verified,
  X,
} from "lucide-react";
import React from "react";
import "../app/globals.css";
import { useState, useEffect } from "react";
import { useWriteContract, useAccount, useReadContract } from "wagmi";
import LiquidERC721v2 from "../app/abi/LiquidERC721v2.json";
import LiquidERC721v3 from "../app/abi/LiquidERC721v3.json";
import LiquidERC1155v2 from "../app/abi/LiquidERC1155v2.json";
import LiquidERC1155v3 from "../app/abi/LiquidERC1155v3.json";
import LiquidifyStandardForMutatioWrapper from "../app/abi/LiquidifyStandardForMutatioWrapper.json";
import { switchChain, watchChainId } from "@wagmi/core";
import { config } from "../app/providers";
import toast from "react-hot-toast";
import { parseEther, MaxUint256 } from "ethers";
import { getFactory } from "@/libs/getFactory";

const LiquidifyMutatio = "0xF9d450590b238CDA15E570F924C9B9fA577A9872";

const CollectionPage = ({ collections }: { collections: any }) => {
  const [walletAddress, setWalletAddress] = useState<string>("");
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
              <div className="flex flex-col w-full items-center justify-center">
                <span className="flex text-2xl items-center py-1 mt-1 select-none font-medium text-white">
                  <BookCheckIcon className="h-[18px] mr-1.5" />
                  Collections
                </span>

                <span className="text-sm xs:w-[380px] mb-3 text-center text-white opacity-50 w-[650px]">
                  Verified collections are to indicate where liquidity for the
                  token has been supplied by a lot of community members or by
                  the team behind the project and are by no means an
                  endorsement.
                </span>
              </div>
              {collections?.liquidNfts?.map((collection: any) => {
                return (
                  <>
                    <div className="group flex w-fit xs:w-full flex flex-col hover:-translate-y-[2.5px] transition-all duration-[200ms]">
                      <a
                        href={`/legacy/${collection.network.toLowerCase()}/${
                          collection.liquidifyContract
                        }`}
                        className="flex flex-grow bg-white xs:w-full sm:w-[170px] sm:max-w-[170px] transition-all duration-[55ms] hover:bg-opacity-[13.5%] cursor-pointer select-none flex flex-grow w-full bg-opacity-10 rounded-t-lg select-none w-full px-3 py-2"
                      >
                        <div className="flex flex-col xs:flex-row items-center justify-center">
                          <div className="h-[143px] mt-1 w-[143px] max-w-[143px] mt-1 rounded-md min-w-[143px] min-h-[143px] max-h-[143px] overflow-hidden ">
                            <img
                              className="transition-all duration-[200ms] xs:mr-3 h-[143px] w-[143px] max-w-[143px] min-w-[143px] min-h-[143px] max-h-[143px] bg-white bg-opacity-10 object-cover rounded-md outline-none overflow-hidden pointer-events-none"
                              src={collection.nftProjectImage || "/temp.png"}
                            />
                          </div>
                          <div className="text-left w-full flex mt-3 max-w-[150px] items-start justify-start">
                            <div className="flex flex-col w-full">
                              <span className="block xs:hidden flex items-center truncate ... max-w-[138px] sm:w-[138px]">
                                {collection.nftName || collection.tokenName}
                                {collection.liquidifyVerified && (
                                  <>
                                    <Verified className="h-[13.9px] ml-0" />
                                  </>
                                )}
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
                              <span className="text-xs truncate ...">
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
                          className="group flex bg-white rounded-bl-lg w-full h-[39px] transition-all duration-[55ms] px-3.5 items-center justify-center hover:bg-opacity-[13.5%] cursor-pointer select-none flex bg-opacity-10 select-none"
                        >
                          <img
                            src="/opensea.png"
                            className="min-h-[15px] transition-all shadow-xl group-hover:shadow-none min-w-[15px] max-h-[15px] max-w-[15px] rounded-md overflow-none"
                          />
                        </a>
                        <a
                          href={`${
                            collection.network == "Ethereum"
                              ? "https://etherscan.io/address/"
                              : collection.network === "Base"
                              ? "https://basescan.org/address/"
                              : ""
                          }${collection.liquidifyContract}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex w-full group bg-white transition-all duration-[55ms] px-3.5 items-center justify-center hover:bg-opacity-[13.5%] cursor-pointer select-none flex bg-opacity-10 select-none"
                        >
                          <img
                            src="/etherscan.svg"
                            className="min-h-[15px] transition-all shadow-xl group-hover:shadow-none min-w-[15px] max-h-[15px] max-w-[15px] rounded-md overflow-none"
                          />
                        </a>
                        <a
                          href={`https://app.uniswap.org/#/swap?theme=dark&inputCurrency=ETH&outputCurrency=${collection.liquidifyContract}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex w-full group bg-white rounded-br-lg transition-all duration-[55ms] px-3.5 items-center justify-center hover:bg-opacity-[13.5%] cursor-pointer select-none flex bg-opacity-10 select-none"
                        >
                          <img
                            src="/uniswap.png"
                            className="min-h-[15px] transition-all shadow-xl group-hover:shadow-none min-w-[15px] max-h-[15px] max-w-[15px] rounded-md overflow-none"
                          />
                        </a>
                      </div>
                      {/* <div
                    onClick={() => {
                      window.open(
                        "https://www.dextools.io/app/en/ether/token/0x74fb648e0a76831d5a18bf08333603450da7c221"
                      );
                    }}
                    className="flex w-[70px] max-w-[70px] bg-white transition-all duration-[100ms] px-3.5 items-center justify-center hover:bg-opacity-[17.5%] cursor-pointer select-none flex bg-opacity-10 rounded-r-lg select-none border-y-2 border-r-2 border-opacity-10 border-white"
                  >
                    <img src="/dextools.svg" className="h-[20px]" />
                  </div> */}
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
