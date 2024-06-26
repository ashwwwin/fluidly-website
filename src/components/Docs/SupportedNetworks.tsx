"use client";

import {
  Construction,
  Crown,
  HardHat,
  HelpCircle,
  Info,
  Leaf,
  Plug,
  Wrench,
} from "lucide-react";
import React from "react";
import "../../app/globals.css";
import toast from "react-hot-toast";

const FaqPage_SupportedNetworks = () => {
  return (
    <>
      <div className="items-center bg-white text-white mt-1 rounded-sm py-1 bg-opacity-0 transition-all text-2xl rounded-md select-none text-opacity-100">
        <div className="flex items-center font-medium">
          <Plug className="h-[18px] mr-1.5 rotate-[45deg]" /> Supported networks
        </div>
      </div>
      <div className="flex flex-col p-3 opacity-50 gap-y-5 mt-1 mb-12 w-full mx-auto text-left">
        <span className="text-white">
          Our contracts are built with Solidity and are compatible with any EVM
          based chain. If there's a chain or layer that you want that we don't
          currently support feel free to reach out, we're open to adding it onto
          our roadmap or fast track it in certain cases.
        </span>

        <div className="flex flex-col text-white">
          <div className="flex select-none shadow-xl bg-white text-sm bg-opacity-[10%] border-2 w-fit rounded-md border-[#3D3D3D] z-[1000]">
            <div className="font-medium w-[120px] max-w-[120px] min-w-[120px] py-1 justify-center flex items-center">
              Network
            </div>
            <div className="h-full px-[1px] bg-[#3D3D3D]" />
            <div className="font-medium w-[480px] max-w-[480px] min-w-[480px] py-1 justify-center flex items-center">
              LiquidifyV3Factory
            </div>
          </div>
          <div className="flex border-2 border-[#2C2C2C] pt-2 -mt-2 border-t-0 w-fit">
            <div className="w-[120px] max-w-[120px] min-w-[120px] py-0.5 justify-center flex items-center">
              Base
            </div>
            <div className="h-full px-[1px] bg-white bg-opacity-[17.5%]" />
            <div
              onClick={() => {
                navigator.clipboard.writeText(
                  "0x71e1102793f399d517d23c1c29030229c9b18b34"
                );
                toast.success("Copied to clipboard");
              }}
              className="w-[480px] max-w-[480px] font-mono text-sm min-w-[480px] cursor-pointer select-none hover:opacity-80 transition-all duration-[150ms] py-0.5 justify-center flex items-center"
            >
              0x71e1102793f399d517d23c1c29030229c9b18b34
            </div>
          </div>
          <div className="flex border-2 border-[#2C2C2C] border-t-0 w-fit">
            <div className="w-[120px] max-w-[120px] min-w-[120px] py-0.5 justify-center flex items-center">
              Polygon
            </div>
            <div className="h-full px-[1px] bg-white bg-opacity-[17.5%]" />
            <div
              onClick={() => {
                navigator.clipboard.writeText(
                  "0x1eEb916393475d501e25343A9B6f05E913cDA7d1"
                );
                toast.success("Copied to clipboard");
              }}
              className="w-[480px] max-w-[480px] font-mono text-sm min-w-[480px] cursor-pointer select-none hover:opacity-80 transition-all duration-[150ms] py-0.5 justify-center flex items-center"
            >
              0x1eEb916393475d501e25343A9B6f05E913cDA7d1
            </div>
          </div>
          <div className="flex border-2 border-[#2C2C2C] border-t-0 w-fit">
            <div className="w-[120px] max-w-[120px] min-w-[120px] py-0.5 justify-center flex items-center">
              Blast
            </div>
            <div className="h-full px-[1px] bg-white bg-opacity-[17.5%]" />
            <div
              onClick={() => {
                navigator.clipboard.writeText(
                  "0x2A567aDA8bAa8C845ae6991ba16C9c8c18aE4314"
                );
                toast.success("Copied to clipboard");
              }}
              className="w-[480px] max-w-[480px] font-mono text-sm min-w-[480px] cursor-pointer select-none hover:opacity-80 transition-all duration-[150ms] py-0.5 justify-center flex items-center"
            >
              0x2A567aDA8bAa8C845ae6991ba16C9c8c18aE4314
            </div>
          </div>
          <div className="flex border-2 border-[#2C2C2C] border-t-0 w-fit">
            <div className="w-[120px] max-w-[120px] min-w-[120px] py-0.5 justify-center flex items-center">
              Optimism
            </div>
            <div className="h-full px-[1px] bg-white bg-opacity-[17.5%]" />
            <div className="w-[480px] max-w-[480px] min-w-[480px] py-0.5 justify-center flex items-center">
              <Construction className="h-[13px]" />
            </div>
          </div>
          <div className="flex border-2 border-[#2C2C2C] border-t-0 w-fit">
            <div className="w-[120px] max-w-[120px] min-w-[120px] py-0.5 justify-center flex items-center">
              Arbitrum
            </div>
            <div className="h-full px-[1px] bg-white bg-opacity-[17.5%]" />
            <div className="w-[480px] max-w-[480px] min-w-[480px] py-0.5 justify-center flex items-center">
              <Construction className="h-[13px]" />
            </div>
          </div>
          <div className="flex border-2 border-white rounded-b-md border-t-0 border-opacity-[17.5%] w-fit">
            <div className="w-[120px] max-w-[120px] min-w-[120px] py-0.5 justify-center flex items-center">
              Ethereum
            </div>
            <div className="h-full px-[1px] bg-white bg-opacity-[17.5%]" />
            <div className="w-[480px] max-w-[480px] min-w-[480px] py-0.5 justify-center flex items-center">
              <Construction className="h-[13px]" />
            </div>
          </div>
        </div>
        {/* <span className="text-white"> 
          The maximum amount of royalties that can be set is 5% and as low as
          0%. Royalties can only be decreased and not increased once the pair is
          created.
        </span> */}

        {/* <span className="text-white">
          Collections must go through an initialization process once in order to
          create the LNFT for their collection. Anyone can wrap and unwrap their
          NFT at any time for the amount of tokens that they wrapped it for. The
          LNFT's ERC20 token is minted or burned on demand when the NFT/LNFT is
          wrapped or unwrapped, respectively.
        </span>
        <span className="text-white">
          If the token is paired with a liquidity pool, they will be able to buy
          tokens from a DEX and if it meets the swap threshold the user will be
          able to unwrap an NFT from the collection. The protocol follows a FIFO
          mechanism (first in, first out) when an NFT is unwrapped.
        </span> */}
        {/* <span className="text-white">
          Liquidify earns 0.3% from token sales. 50% of that revenue is to buy &
          burn $LIQ, our native token. $LIQ has not been launched yet. It's
          launch is conditional on protocol revenue.
        </span>
        <span className="text-white">
          Allocations will be reserved for those who create an LNFT with an LP
          and wrap/unwrap on the Liquidify protocol. A seperate allocation will
          be reserved for past Codechain holders. A seperate allocation will be
          reserved for those who own an{" "}
          <span
            className="hover:text-blue-500 text-blue-300 cursor-pointer"
            onClick={() => {
              window.open("https://etherpixels.com");
            }}
          >
            Ether Pixel
          </span>
          .
        </span> */}
        {/* Future idea: on an availability basis return the user the exact
         NFT they wrapped however, if a new user buys the required tokens to
         unwrap an NFT - the contract will follow a LIFO mechanism (last in,
         first out). */}
      </div>
    </>
  );
};

export default FaqPage_SupportedNetworks;
