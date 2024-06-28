"use client";

import { Crown, HelpCircle, Info, Leaf } from "lucide-react";
import React from "react";
import "../../app/globals.css";

const FaqPage_Royalties = () => {
  return (
    <>
      <div className="items-center bg-white text-white mt-1 rounded-sm py-1 bg-opacity-0 transition-all text-2xl rounded-md select-none text-opacity-100">
        <div className="flex items-center font-medium">
          <Leaf className="h-[18px] mr-1.5" /> Royalties
        </div>
      </div>
      <div className="flex flex-col p-3 opacity-50 gap-y-5 mt-1 mb-12 w-full mx-auto text-left">
        <span className="text-white">
          Royalties (or sell fees) allow for increased revenues for collection
          creators to work on their next big idea. In order to enable royalties,
          the collection owner must create a liquidity pool with Uniswap v2.
        </span>
        <span className="text-white">
          The maximum amount of royalties that can be set is 5% and as low as
          0%. Royalties can only be decreased and not increased once the pair is
          created.
        </span>
        <span className="text-white">
          Royalties are accumulated when a user sells the token via Uniswap. The
          fees are accumulated in the Liquidify Fee Distributor contract, when
          the minimum swap target is reached the fee distribution function is
          called which automatically sends WETH to the royalty receiver.
        </span>
        <span className="text-white">
          This process happens on chain while, using an off-chain price oracle
          in order to minimize contract complexity. When royalties are enabled,
          Liquidify earns 0.25% from token sales. If there are no royalties
          enabled Liquidify earns 0%.
        </span>

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
      </div>
    </>
  );
};

export default FaqPage_Royalties;
