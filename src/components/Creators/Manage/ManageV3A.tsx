"use client";

import {
  ArrowLeftRightIcon,
  ArrowUpRightSquareIcon,
  CircleDollarSign,
  CirclePower,
  Cog,
  Copy,
  Droplet,
  FileSliders,
  FileWarning,
  ImagesIcon,
  LockKeyholeOpenIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import "../../../app/globals.css";
import { useWriteContract, useReadContract, useAccount } from "wagmi";
import { switchChain, watchChainId } from "@wagmi/core";
import { config } from "../../../app/providers";
import LiquidERC721v3 from "../../../app/abi/LiquidERC721v3.json";
import LiquidERC1155v3 from "../../../app/abi/LiquidERC1155v3.json";
import toast from "react-hot-toast";
import { useWalletSettings } from "../../../../store/useWalletSettings";

const ManageV3APage = ({ manage }: { manage: any }) => {
  const {
    data: hash,
    isSuccess,
    isError,
    isPending,
    writeContract,
    error,
  } = useWriteContract();
  const [ownedPairs, setOwnedPairs] = useState([]);
  const [tab, setTab] = useState<"royalties" | "ownership">("royalties");

  const { walletAddress } = useWalletSettings();

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

  const loadOwnedPairs = async () => {
    if (!walletAddress) return;
    let _ownedPairs = await fetch(`/api/pairs/owned?wallet=${walletAddress}`);

    if (!_ownedPairs) return;

    let item = await _ownedPairs.json();
    item = item?.ownedPairs;

    if (!item) return;

    setOwnedPairs(item);
  };

  useEffect(() => {
    loadOwnedPairs();
  }, [walletAddress]);

  return (
    <div className="flex w-full flex-col h-full">
      <div className="flex py-3 shadow-xl w-screen w-full bg-white justify-between bg-opacity-10 mt-[-20px]">
        <div className="flex px-5">
          <img
            src={manage?.nftProjectImage || "/temp.png"}
            className="h-[65px] select-none pointer-events-none w-[65px] rounded-md overflow-none"
          />
          <div className="flex flex-col ml-3">
            <span className="text-2xl text-white font-white select-none">
              Managing
            </span>
            <span className="text-opacity-50 text-white">
              {manage?.tokenName}
            </span>
          </div>
        </div>
        <div className="pr-5">
          <div className="flex gap-x-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(manage?.liquidifyContract);
                toast.success("Copied to clipboard");
              }}
              className="py-1.5 px-3 bg-white text-white text-opacity-60 hover:bg-opacity-[7.5%] transition-all duration-[125ms] rounded-md text-sm bg-opacity-5 border-[1.5px] border-white border-opacity-10"
            >
              Copy token/wrapper address
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(manage?.nftAddress);
                toast.success("Copied to clipboard");
              }}
              className="py-1.5 px-3 bg-white text-white text-opacity-60 hover:bg-opacity-[7.5%] transition-all duration-[125ms] rounded-md text-sm bg-opacity-5 border-[1.5px] border-white border-opacity-10"
            >
              Copy NFT address
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col min-h-[calc(100vh-250px)] select-none gap-y-2.5 mx-3 items-center">
        <div className="mt-3 bg-white text-white w-fit p-1.5 bg-opacity-10 rounded-md flex gap-x-1.5">
          <button
            onClick={() => {
              setTab("royalties");
            }}
            className={`bg-white px-3 transition-all select-none duration-[150ms] font-medium py-1.5 rounded-md ${
              tab == "royalties"
                ? "text-blue-500 bg-opacity-10"
                : "hover:bg-opacity-10 bg-opacity-0"
            }`}
          >
            Royalties
          </button>
          <button
            onClick={() => {
              setTab("ownership");
            }}
            className={`bg-white px-3 transition-all select-none duration-[150ms] font-medium py-1.5 rounded-md ${
              tab == "ownership"
                ? "text-blue-500 bg-opacity-10"
                : "hover:bg-opacity-10 bg-opacity-0"
            }`}
          >
            Ownership
          </button>
          {/* <button className="px-3 py-2 text-white font-medium text-sm rounded-md hover:text-blue-500 ">
            Royalties
          </button>
          <button className="px-3 py-2 text-white font-medium text-sm">
            Ownership
          </button> */}
          {/* <button className="px-3 py-2 text-white font-medium">General statistics</button> */}
        </div>
      </div>
      <div className="flex gap-x-2.5">
        {/* <button>Copy NFT address</button> */}
      </div>
    </div>
  );
};

export default ManageV3APage;
