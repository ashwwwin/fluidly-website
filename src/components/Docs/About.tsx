"use client";

import { HelpCircle, Info } from "lucide-react";
import React from "react";
import "../../app/globals.css";

const FaqPage_About = () => {
  return (
    <>
      <div className="items-center bg-white text-white mt-1 rounded-sm py-1 bg-opacity-0 transition-all text-2xl rounded-md select-none text-opacity-100">
        <div className="flex items-center font-medium">
          <Info className="h-[18px] mr-1.5" /> About Liquidify
        </div>
      </div>
      <div className="flex flex-col p-3 opacity-50 gap-y-5 mt-1 mb-12 w-full mx-auto text-left">
        <span className="text-white">
          Liquidify v3 is a permissionless protocol that allows anyone to create
          ERC20 tokens that are backed 1:1 by NFTs. These are known as LNFTs (or
          Liquid NFTs). This lowers the barriers of entry into NFT ownership by
          bringing liquidity into NFTs by allowing for fractional ownership at
          scale while providing instant liquidity for collectors.
        </span>
        <span className="text-white">
          Pair creators have full control of their LNFT pairs, they can set an
          initial royalty fee of up to 5% which automatically gets converted to
          ETH & sent to them when a collector or trader makes a sale. Increased
          royalties allow creators to work on their next big idea!
        </span>
        <span className="text-white">
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
        </span>
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

export default FaqPage_About;
