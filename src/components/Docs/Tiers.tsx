"use client";

import { Crown, HelpCircle, Info } from "lucide-react";
import React from "react";
import "../../app/globals.css";

const FaqPage_Tiers = () => {
  return (
    <>
      <div className="items-center bg-white text-white mt-1 rounded-sm py-1 bg-opacity-0 transition-all text-2xl rounded-md select-none text-opacity-100">
        <div className="flex items-center font-medium">
          <Crown className="h-[18px] mr-1.5" /> Tiers
        </div>
      </div>
      <div className="flex flex-col p-3 opacity-50 gap-y-5 mt-1 mb-12 w-full mx-auto text-left">
        <span className="text-white">
          Rarity tiers allow collection owners to pay respect to different
          rarity traits. This preserves the fun of collecting rare NFTs and the
          value of scarcity. The collection owner must specify which token ids
          receive a different amount of tokens in the following manner before
          enabling the pair, eg:
        </span>

        <span className="text-white flex flex-col p-2 bg-white bg-opacity-[7.5%] rounded-md w-fit">
          <span className="opacity-70 pb-0.5 border-b-[1.5px] border-white border-opacity-10">tokenId tokens</span>
          <span className="pt-0.5">583 300</span>
          <span>930 300</span>
          <span>121 300</span>
          <span>523 900</span>
          <span>11 900</span>
        </span>

        <span className="text-white">
          Let's assume for this collection the base amount of tokens is 100. If
          a user wraps any of the token id's above they will automatically
          receive the token amount specified. If they wrap a token id without a
          rarity tier, they will receive 100 tokens. This creates tiers which
          the user can select for when unwrapping.
        </span>

        <span className="text-white">
          For ERC721 contracts, setting custom token amounts can only be done
          once and will be unmodifiable once the pair has been enabled. Enabling
          the pair will allow users to start wrapping/unwrapping.
        </span>

        <span className="text-white">
          For ERC1155 contracts, each token id has to be enabled individually
          (with the option to set a custom tier), following the same format as
          above. If the collection owner mints a new edition, they will not be
          able to wrapped unless this is enabled.
        </span>

        <span className="text-white">
          This difference in LiquidERC721 and LiquidERC1155 contracts are due to
          the historical usage of their base contracts. ERC721's tend to be used
          in fixed supply settings. ERC1155's tend to have a fixed supply per
          token id while having new token ids created periodically for new
          editions. We've created the Liquidify contracts to take these into
          consideration.
        </span>

        {/* <span className="text-white">
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

export default FaqPage_Tiers;
