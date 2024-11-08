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
import "../../../../app/globals.css";
import { useWriteContract, useReadContract, useAccount } from "wagmi";
import { switchChain, watchChainId } from "@wagmi/core";
import { config } from "../../../../app/providers";
import LiquidERC721v3 from "../../../../app/abi/LiquidERC721v3.json";
import LiquidERC1155v3 from "../../../../app/abi/LiquidERC1155v3.json";
import toast from "react-hot-toast";
import { useWalletSettings } from "../../../../../store/useWalletSettings";

const ManagePage = () => {
  const {
    data: hash,
    isSuccess,
    isError,
    isPending,
    writeContract,
    error,
  } = useWriteContract();
  const [ownedPairs, setOwnedPairs] = useState([]);
  const [manage, setManage] = useState<any>();

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
      <div className="flex flex-col items-center">
        <span className="flex text-2xl text-center justify-center items-center py-1 mt-1 select-none font-medium text-white">
          <FileSliders className="h-[18px] mr-2" />
          Manage pairs
        </span>
        <span className="text-sm text-white text-opacity-50 w-[450px] text-center">
          Manage royalties, royalty receipent, contract ownership and more.
        </span>
      </div>

      <div className="flex flex-col min-h-[calc(100vh-250px)] select-none items-center justify-center gap-y-2.5">
        {!manage && (
          <>
            {ownedPairs.length >= 1 ? (
              <>
                {ownedPairs?.map((pair: any) => (
                  <>
                    <a
                      href={`/${pair.network.toLowerCase()}/${
                        pair?.liquidifyContract
                      }/manage`}
                      className="flex outline-none hover:outline-none py-2 cursor-pointer px-3.5 transition-all duration-[100ms] items-center bg-white bg-opacity-10 hover:bg-opacity-[15%] min-w-[460px] max-w-[460px] rounded-lg"
                    >
                      <img
                        className="border-[1px] object-cover rounded-md select-none overflow-none border-opacity-10 border-white h-[55px] mr-3 w-[55px] min-w-[55px] min-h-[55px] max-w-[55px] max-h-[55px]"
                        src={pair?.nftProjectImage || "/temp.png"}
                      />
                      <div className="flex flex-col">
                        <span className="text-white">
                          {pair?.tokenName} / ${pair.tokenSymbol}
                        </span>
                        <span className="text-white text-sm">
                          {pair?.liquidifyContract}
                        </span>
                        <span className="text-white text-sm">
                          {pair.type} on {pair.network}
                        </span>
                      </div>
                    </a>
                  </>
                ))}
              </>
            ) : (
              <>
                <div className="flex flex-col items-center pt-[50px]">
                  <FileWarning className="text-white mb-2 opacity-80" />
                  <span className="text-white opacity-80">
                    No created pairs found
                  </span>
                  <span className="text-white text-sm opacity-50 select-text items-center text-center w-[350px]">
                    Create a pair to get started. If you just created a pair and
                    don't see it here, try refreshing.
                  </span>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ManagePage;
