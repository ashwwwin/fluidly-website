"use client";

import { Info } from "lucide-react";
import React from "react";
import "../app/globals.css";

const AboutPage = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center ">
        <div className="items-center bg-white text-white mt-1 rounded-sm py-1 bg-opacity-0 transition-all text-2xl rounded-md select-none text-opacity-100">
          <div className="flex items-center font-medium">
            <Info className="h-[18px] mr-1.5" /> About Liquidify
          </div>
        </div>
        <div className="flex flex-col opacity-50 gap-y-5 mt-4 w-full max-w-[720px] mx-auto text-center">
          <span className="text-white">
            Liquidify v1 is a permissionless protocol built on on Ethereum L1,
            Base, Blast (soon) and Arbitrum (soon) that allows anyone to create
            ERC20 tokens that are backed 1:1 by their favorite NFTs. These are
            known as LNFTs (or Liquid NFTs). It lowers the barriers of entry
            into NFT ownership by bringing liquidity into NFTs and allowing for
            fractional ownership at scale.
          </span>

          <span className="text-white">
            Collections must go through an initialization process once in order
            to create the LNFT for their collection. Anyone can wrap and unwrap
            their NFT at any time for the amount of tokens that they wrapped it
            for. The LNFT's ERC20 token is minted or burned on demand when the
            NFT/LNFT is wrapped or unwrapped, respectively.
          </span>
          <span className="text-white">
            If the token is paired with a liquidity pool, they will be able to
            buy tokens from a DEX and if it meets the swap threshold the user
            will be able to unwrap an NFT from the collection. The protocol
            follows a FIFO mechanism (first in, first out) when an NFT is
            unwrapped.
          </span>
          <span className="text-white">
            Liquidify earns a 0.5% fee from transfers and uses 50% of that to
            buy & burn $LIQ, our native token (if the LNFT's ERC20 is paired
            with an LP).
          </span>
          <span className="text-white">
            $LIQ has not been launched yet and an allocation will be reserved
            for those who create an LNFT with an LP, trade any LNFT or wrap and
            unwrap on the Liquidify protocol. A seperate allocation will be
            reserved for those who own an{" "}
            <span
              className="hover:text-blue-300 cursor-pointer"
              onClick={() => {
                window.open("https://etherpixels.com");
              }}
            >
              Ether Pixel
            </span>
            .
          </span>
          {/* Future idea: on an availability basis return the user the exact
         NFT they wrapped however, if a new user buys the required tokens to
         unwrap an NFT - the contract will follow a LIFO mechanism (last in,
         first out). */}
        </div>
      </div>
    </>
  );
};

export default AboutPage;
