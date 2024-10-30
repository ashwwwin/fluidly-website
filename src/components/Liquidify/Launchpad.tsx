"use client";

import { ArrowUpRightSquareIcon, Rocket } from "lucide-react";
import React, { useEffect, useState } from "react";
import "../../app/globals.css";
import { useWriteContract, useReadContract, useAccount } from "wagmi";
import toast from "react-hot-toast";
import { getFactory } from "@/libs/getFactory";

const LaunchpadPage = () => {
  const { data: hash, isError, writeContract, error } = useWriteContract();
  const account = useAccount();
  const [factoryAddress, setFactoryAddress] = useState<`0x${string}`>(
    "0x90c99e085992a4a93BB3105C8b5cBe4E26A0d420"
  );
  const [explorer, setExplorer] = useState<string>("https://etherscan.io");
  

  useEffect(() => {
    let currentChain = account.chainId;
    if (!currentChain) return;


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

  return (
    <>
      <div className="flex w-full flex-col h-full">
        <div className="flex flex-col items-center">
          <span className="flex text-2xl text-center justify-center items-center py-1 mt-1 select-none font-medium text-white">
            <Rocket className="h-[18px] mr-2" />
            Launchpad
          </span>
          <span className="text-sm text-white text-opacity-50 w-[450px] text-center">
            If a collection you would like to trade as an ERC20 has already been
            liquidified there's no need to repeat this process.
          </span>
        </div>

        <div className="flex flex-col min-h-[calc(100vh-250px)] items-center justify-center"></div>
      </div>
    </>
  );
};

export default LaunchpadPage;
