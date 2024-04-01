"use client";

import { Info } from "lucide-react";
import React from "react";
import "../app/globals.css";

const FaqPage = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center ">
        <div className="items-center bg-white text-white mt-1 rounded-sm py-1 bg-opacity-0 transition-all text-2xl rounded-md select-none text-opacity-100">
          <div className="flex items-center font-medium">
            <Info className="h-[18px] mr-1.5" /> FAQ
          </div>
        </div>
        <div className="flex flex-col gap-y-8 gap-y-5 w-full max-w-[720px] mx-auto text-center">
          <div className="text-white flex flex-col mt-6">
            <span className="font-semibold select-none">
              What is Liquidify?
            </span>
            <span className="text-sm mt-1">
              We provide a trusted bridge between your NFT and ensuring that it
              is backed 1:1 with it's ERC20 token. We ensure that when you wrap
              your token in exchange for an NFT that you will always be able to
              trade the exact amount of tokens back for another NFT from that
              collection.
            </span>
          </div>
          <div className="text-white flex flex-col">
            <span className="font-semibold select-none">
              Why do I have to approve my NFTs?
            </span>
            <span className="text-sm mt-1">
              This is a standard procedure that all ERC721s go through when they
              need to be 'traded'. When you trade a collection you haven't
              before on Magic Eden, Blur, Opensea, etc - this is a required
              approval. Liquidify's LNFT contract only utilizes this once, and
              it is only to grant you the power to transfer of your NFT into the
              contract (when you use the wrapping function) if you choose to.
            </span>
          </div>
          <div className="text-white flex flex-col">
            <span className="font-semibold select-none">
              Will I always be able to trade my tokens for an NFT?
            </span>
            <span className="text-sm mt-1">
              Yes, as long as it meets the required tokens. The required tokens
              are exactly the amount that the NFT was traded for initially. The
              token to nft amount and the nft to token amount will always be
              equal and will never change for each collection.
            </span>
          </div>
          <div className="text-white flex flex-col">
            <span className="font-semibold select-none">
              Why do I see more than one of the same collection?
            </span>
            <span className="text-sm mt-1">
              Hundreds of LNFTs can be created for the same collection, the
              question is which one has the most value and safety token-wise if
              you are looking to trade these tokens. Collections with a verified
              badge show a certain level of quality and by no means are an
              endorsement.
            </span>
          </div>

          <div className="text-white flex flex-col">
            <span className="font-semibold select-none">
              What are the risks?
            </span>
            <span className="text-sm mt-1">
              Liquidfy is a v1 protocol - while our contracts have been
              thoroughly reviewed and kept minimally complex. Be aware of smart
              contract risks. We have multiple safeguards in place in the event
              of an exploit. Get in touch with us if you find an issue, we offer
              whitehat bounties.
            </span>
          </div>
          <div className="text-white flex flex-col mb-12">
            <span className="font-semibold select-none">
              When does $LIQ go live?
            </span>
            <span className="text-sm mt-1">TBA</span>
          </div>

          {/* Future idea: on an availability basis return the user the exact
         NFT they wrapped however, if a new user buys the required tokens to
         unwrap an NFT - the contract will follow a LIFO mechanism (last in,
         first out). */}
        </div>
      </div>
    </>
  );
};

export default FaqPage;
