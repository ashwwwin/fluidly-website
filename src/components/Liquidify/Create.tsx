"use client";

import {
  ArrowUpRightSquareIcon,
  CircleDollarSign,
  Copy,
  Droplet,
  FileWarning,
  ImagesIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import "../../app/globals.css";
import LiquidifyV3Factory from "../../app/abi/LiquidifyV3Factory.json";
import { useWriteContract, useReadContract, useAccount } from "wagmi";
import { switchChain, watchChainId } from "@wagmi/core";
import toast from "react-hot-toast";
import { getFactory } from "@/libs/getFactory";

const CreatePage = () => {
  const { data: hash, isError, writeContract, error } = useWriteContract();
  const account = useAccount();
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [nftContractAddress, setNftContractAddress] = useState("");
  const [tokensPerNft, setTokensPerNft] = useState<number>(1);
  const [factoryAddress, setFactoryAddress] = useState<`0x${string}`>(
    "0x90c99e085992a4a93BB3105C8b5cBe4E26A0d420"
  );
  const [explorer, setExplorer] = useState<string>("https://etherscan.io");
  const [sellFees, setSellFees] = useState<number>(0);
  const [nftType, setNftType] = useState<"ERC721" | "ERC1155">("ERC721");

  useEffect(() => {
    let currentChain = account.chainId;
    if (!currentChain) return;

    if (currentChain == 1) setExplorer("https://etherscan.io");
    if (currentChain === 8453) setExplorer("https://basescan.org");
    if (currentChain === 137) setExplorer("https://polygonscan.com");

    let _factoryAddress = getFactory(currentChain);

    setFactoryAddress(_factoryAddress as `0x${string}`);
  }, [account.chainId]);

  const toastTx = (tx: any) => {
    setTimeout(() => {
      toast.custom(
        <div className="flex flex-col p-3 bg-[#0d0d0d]">
          <span className="text-white">Transaction sent</span>
          <button
            onClick={() => {
              window.open(`${explorer}/tx/${tx}`);
            }}
            className="mt-2 flex select-none w-fit items-center opacity-80 text-white text-sm pl-2 pr-1 py-1 bg-blue-500 rounded-md bg-opacity-80 hover:bg-opacity-100 transition-all"
          >
            Explorer{" "}
            <ArrowUpRightSquareIcon className="ml-0.5 opacity-80 h-[15px]" />
          </button>
        </div>
      );
    }, 2000);
  };

  useEffect(() => {
    if (!error) return;
    let errMsg = error.toString();

    if (errMsg.includes("User rejected the request")) {
      return;
    }

    if (errMsg.includes("Connector not connected")) {
      toast.error("Please connect your wallet");
      return;
    }

    if (
      errMsg.includes(
        "executing this transaction exceeds the balance of the account"
      )
    ) {
      toast.error("Insufficient ETH balance for transaction and gas");
      return;
    }

    if (errMsg.includes("Listing expired")) {
      toast.error("Listing expired for one or more blocks");
      return;
    }

    toast.error(errMsg);
    return;
  }, [isError]);

  const createLNFT = () => {

    const tx = writeContract(
      {
        address: factoryAddress,
        abi: LiquidifyV3Factory.abi,
        functionName:
          nftType === "ERC721" ? "createLiquidERC721" : "createLiquidERC1155",
        args: [
          tokenName,
          tokenSymbol,
          nftContractAddress,
          ...(nftType === "ERC721" ? [tokensPerNft] : []),
          sellFees * 100,
        ],
      },
      {
        onSuccess: (tx: any) => {
          toastTx(tx);
        },
      }
    );
  };

  return (
    <>
      <div className="flex w-full flex-col h-full">
        <div className="flex flex-col items-center">
          <span className="flex text-2xl text-center justify-center items-center py-1 mt-1 select-none font-medium text-white">
            <Droplet className="h-[18px] mr-2" />
            Liquidify
          </span>
          <span className="text-sm text-white text-opacity-50 w-[450px] text-center">
            If a collection you would like to trade as an ERC20 has already been
            liquidified there's no need to repeat this process.
          </span>
        </div>

        <div className="flex flex-col min-h-[calc(100vh-250px)] items-center justify-center">
          <div className="p-3 bg-white bg-opacity-5 rounded-md mt-8 w-full max-w-md">
            <div className="text-white mb-5 flex-col gap-y-2.5 flex items-center">
              <div className="p-3 bg-white shadow-xl bg-opacity-5 rounded-md w-full flex items-center flex-col max-w-md">
                <span className="select-none border-b-2 pb-0.5 border-white border-opacity-5 select-none">
                  NFT Details
                </span>
                <input
                  onChange={(e) => {
                    setNftContractAddress(e.target.value);
                  }}
                  placeholder={`NFT contract address`}
                  className="text-white bg-white bg-opacity-10 w-full outline-none py-1.5 mt-2.5 px-2 rounded-md"
                />

                <div className="flex gap-x-1 mt-3 p-1 bg-white rounded-md items-center text-sm w-fit h-fit bg-opacity-5">
                  <ImagesIcon className="mr-1 ml-1 h-[17px] opacity-80" />
                  <button
                    onClick={() => {
                      setNftType("ERC721");
                    }}
                    className={
                      "py-1 px-3 bg-white rounded-[4px] transition-all text-white " +
                      (nftType == "ERC721"
                        ? "bg-opacity-[7.5%]"
                        : "bg-opacity-0 hover:bg-opacity-[5%] text-opacity-80")
                    }
                  >
                    ERC721
                  </button>
                  <button
                    onClick={() => {
                      setNftType("ERC1155");
                    }}
                    className={
                      "py-1 px-3 bg-white rounded-[4px] transition-all text-white " +
                      (nftType == "ERC1155"
                        ? "bg-opacity-[7.5%]"
                        : "bg-opacity-0 hover:bg-opacity-[5%] text-opacity-80")
                    }
                  >
                    ERC1155
                  </button>
                </div>
              </div>

              <span className="mt-5 border-b-2 pb-0.5 border-white border-opacity-[7.5%] select-none">
                ERC20 to create
              </span>
              <input
                placeholder="Token name"
                onChange={(e) => {
                  setTokenName(e.target.value);
                }}
                className="text-white bg-white bg-opacity-10 w-full outline-none py-1.5 px-2 rounded-md"
              />
              <input
                onChange={(e) => {
                  setTokenSymbol(e.target.value);
                }}
                placeholder="Token symbol"
                className="text-white bg-white bg-opacity-10 w-full outline-none py-1.5 px-2 rounded-md"
              />
              <div className="flex gap-x-2 w-full">
                <input
                  onChange={(e) => {
                    setTokensPerNft(parseInt(e.target.value));
                  }}
                  placeholder={nftType == "ERC721" ? "Tokens per NFT" : ""}
                  className={
                    "text-white bg-white w-1/2 outline-none py-1.5 px-2 rounded-md " +
                    (nftType == "ERC1155" ? "cursor-not-allowed bg-opacity-5" : "bg-opacity-10")
                  }
                  disabled={nftType == "ERC1155"}
                />
                <div className="flex w-1/2">
                  <input
                    onChange={(e) => {
                      setSellFees(parseInt(e.target.value));
                    }}
                    placeholder="Sell fees"
                    className="text-white bg-white bg-opacity-10 w-full outline-none py-1.5 px-2 rounded-l-md"
                  />
                  <div className="select-none text-white pl-1 px-2 py-1 bg-white bg-opacity-10 text-sm flex items-center justify-center font-bold text-opacity-50 rounded-r-md">
                    %
                  </div>
                </div>
              </div>
            </div>

            <span className="mt-3 text-white text-sm opacity-70 w-full text-center flex items-center">
              You can wrap & unwrap NFTs in exchange for tokens after the LNFT
              pair has been created
            </span>
            <div className="flex gap-x-3 mt-5 w-full">
              <button
                onClick={createLNFT}
                className="bg-blue-500 w-full select-none hover:bg-opacity-100 bg-opacity-90 transition-all border-2 border-opacity-10 text-white outline-none rounded-md border-white px-3 py-1"
              >
                Create LNFT
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePage;
