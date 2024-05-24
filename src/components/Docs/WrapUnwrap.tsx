"use client";

import { HelpCircle, Info, MousePointerClick } from "lucide-react";
import React from "react";
import "../../app/globals.css";

const FaqPage_WrapUnwrap = () => {
  return (
    <>
      <div className="items-center bg-white text-white mt-1 rounded-sm py-1 bg-opacity-0 transition-all text-2xl rounded-md select-none text-opacity-100">
        <div className="flex items-center font-medium">
          <MousePointerClick className="h-[18px] mr-1.5" /> Wrap/Unwrap
        </div>
      </div>
      <div className="flex flex-col p-3 opacity-50 gap-y-5 mt-1 mb-12 w-full text-left">
        <span className="text-white flex">
          Wrapping or unwrapping allows a user to exchange their NFTs for a
          token or vice versa, respectively. The amount of tokens the user
          receives per NFT depends if rarity is enabled for the collection they
          are trading. Wrapping and unwrapping is a fairly simple process and
          can be done on the collections page.
        </span>

        <span className="text-white flex">
          Before the user can start wrapping an NFT collection, they would need
          to approve a spending allowance for the Liquidify contract which
          grants them the power to move the NFT from their wallet to the
          Liquidify contract.
        </span>

        <span className="text-white flex">
          Once an NFT is moved into a Liquidify contract, the token is minted on
          demand straight to the user's wallet. The amount of tokens minted
          depends on two factors:
        </span>
        <span className="text-white flex flex-col">
          <span className="flex items-center">
            <div className="w-[5px] mr-1.5 h-[1.5px] rounded-full bg-white" />
            the base tokens per NFT
          </span>
          <span className="flex items-center">
            <div className="w-[5px] mr-1.5 h-[1.5px] rounded-full bg-white" />
            the rarity for the NFT
          </span>
        </span>

        <span className="text-white flex">
          If there is a rarity tier the contract will mint the respective token
          amount. If no rarity tier is set, the contract will mint the base
          tokens to the user's wallet.
        </span>

        <span className="text-white flex">
          When unwrapping, the user is required to have a minimum of either the
          base tokens or the rarity tier amount. The contract is required to
          have an NFT stored in the respective tier. If there is no NFT in a
          tier, it cannot be unwrapped regardless of whether the user meets the
          token requirement.
        </span>

        <span className="text-white flex">
          When the contract passes the required amount check and the
          availability for the NFT, it burns the token on demand and transfers
          the NFT to the user. The NFT that the user receives is based on the
          last NFT wrapped into the contract, following the LIFO mechanism.
        </span>

        <span className="text-white flex">
          Wrapping or unwrapping costs 0.0002 ETH per NFT with a
          maximum fee cap of 0.003 ETH per transaction.
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

export default FaqPage_WrapUnwrap;
