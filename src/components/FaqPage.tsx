"use client";

import { HelpCircle, Info } from "lucide-react";
import React from "react";
import "../app/globals.css";

const FaqPage = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center ">
        <div className="items-center bg-white text-white mt-1 rounded-sm py-1 bg-opacity-0 transition-all text-2xl rounded-md select-none text-opacity-100">
          <div className="flex items-center font-medium">
            <HelpCircle className="h-[18px] mr-1.5" /> FAQ
          </div>
        </div>
        <div className="flex flex-col gap-y-8 gap-y-5 w-full max-w-[750px] mx-auto text-center mb-12">
          <div className="text-white flex flex-col mt-6">
            <span className="font-semibold select-none">
              What is Liquidify?
            </span>
            <span className="text-md mt-1 opacity-50">
              We provide a trusted bridge between your NFT and an ERC20 token,
              ensuring that it is always backed 1:1. We ensure that when you
              wrap your token in exchange for an NFT that you will always be
              able to trade the exact amount of tokens back for an NFT from that
              collection.
            </span>
          </div>
          <div className="text-white flex flex-col">
            <span className="font-semibold select-none">
              Why do I have to approve my NFTs?
            </span>
            <span className="text-md mt-1 opacity-50">
              When you trade a collection you haven't before on any NFT
              marketplace. This is a standard procedure that all NFTs go through
              when they need to be traded on a protocol. Liquidify's LNFT
              contract only utilizes this once, and it is only to grant you the
              power to transfer of your NFT into the contract (when you use the
              wrapping function) if you choose to.
            </span>
          </div>
          <div className="text-white flex flex-col">
            <span className="font-semibold select-none">
              Will I always be able to trade my tokens for an NFT?
            </span>
            <span className="text-md mt-1 opacity-50">
              Yes, as long as it meets the required tokens. The required tokens
              are exactly the amount that the NFT was traded for initially. The
              token to nft amount and the nft to token amount will always be
              equal and are immutable for each LNFT pair.
            </span>
          </div>
          <div className="text-white flex flex-col">
            <span className="font-semibold select-none">
              Why are royalties not working on my collection?
            </span>
            <span className="text-md mt-1 opacity-50">
              Please reach out to us on Twitter and we'll enable them for you
              once we verify that you are the collection owner.
            </span>
          </div>
          <div className="text-white flex flex-col">
            <span className="font-semibold select-none">
              Why do I see more than one of the same collection?
            </span>
            <span className="text-md mt-1 opacity-50">
              Hundreds of LNFT pairs can be created for the same collection, the
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
            <span className="text-md mt-1 opacity-50">
              Liquidfy v2 is a permisionless protocol - while our contracts have
              been thoroughly reviewed and kept minimally complex. It is
              important to be aware of smart contract risks. Get in touch with
              us if you find an issue, we offer whitehat bounties.
            </span>
          </div>
          {/* <div className="text-white flex flex-col">
            <span className="font-semibold select-none">
              What is the safeguard on the contract?
            </span>
            <span className="text-md mt-1 opacity-50">
              Even though Liquidify has been thoroughly reviewed. Smart contract
              risks happen and while highly unlikely, we have failsafes in place
              in the event of an exploit to protect your NFTs. Collection owners
              can ask us to revoke access permanently at anytime.
            </span>
          </div> */}

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
