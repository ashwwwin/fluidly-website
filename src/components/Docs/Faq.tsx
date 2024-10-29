"use client";

import { HelpCircle, Info } from "lucide-react";
import React from "react";
import "../../app/globals.css";

const FaqPage_Faq = () => {
  return (
    <>
      <div className="items-center bg-white text-white mt-1 mb-1.5 rounded-sm py-1 bg-opacity-0 transition-all text-2xl rounded-md select-none text-opacity-100">
        <div className="flex items-center font-medium">
          <HelpCircle className="h-[18px] mr-1.5" /> Frequently asked questions
        </div>
      </div>
      <div className="flex flex-col gap-y-3.5 w-full text-left ">
        <div className="text-white bg-white p-3 rounded-lg shadow-inner bg-opacity-[3%] flex flex-col">
          <span className="font-medium select-none opacity-[85%] border-b-[2px] pb-[1px] border-opacity-[3%] border-white w-fit">
            What is Fluidly?
          </span>
          <span className="text-md mt-1 opacity-50">
            We provide a trusted bridge between your NFT and an ERC20 token,
            ensuring that it is always backed 1:1. We ensure that when you wrap
            your token in exchange for an NFT, your tokens will always be backed
            by NFTs from that collection.
          </span>
        </div>
        <div className="text-white bg-white p-3 rounded-lg shadow-inner bg-opacity-[3%] flex flex-col">
          <span className="font-medium select-none opacity-[85%] border-b-[2px] pb-[1px] border-opacity-[3%] border-white w-fit">
            What does wrapping/unwrapping mean?
          </span>
          <span className="text-md mt-1 opacity-50 flex flex-col gap-y-0.5">
            <span>
              When you wrap your NFT you send your specified NFT into a
              project's Fluidly contract, and receive tokens that are minted on
              demand.
            </span>
            <span>
              When you unwrap an NFT you send the specified amount of tokens
              into a project's Fluidly contract which is then burned and you
              will receive an NFT from the contract.
            </span>
          </span>
        </div>
        <div className="text-white bg-white p-3 rounded-lg shadow-inner bg-opacity-[3%] flex flex-col">
          <span className="font-medium select-none opacity-[85%] border-b-[2px] pb-[1px] border-opacity-[3%] border-white w-fit">
            Do you provide liquidity?
          </span>
          <span className="text-md mt-1 opacity-50">
            No, we provide a way to convert your NFTs into ERC20s. The LP relies
            on the team behind the project or the community to do so.
          </span>
        </div>
        <div className="text-white bg-white p-3 rounded-lg shadow-inner bg-opacity-[3%] flex flex-col">
          <span className="font-medium select-none opacity-[85%] border-b-[2px] pb-[1px] border-opacity-[3%] border-white w-fit">
            Why do I have to approve my NFTs?
          </span>
          <span className="text-md mt-1 opacity-50">
            This is a standard procedure that all NFTs go through when they need
            to be traded on a protocol (eg. when you trade a collection you
            haven't before on any NFT marketplace). Fluidly's LNFT contracts
            only utilizes this to grant you the power to transfer your NFT into
            the contract (when you wrap).
          </span>
        </div>
        <div className="text-white bg-white p-3 rounded-lg shadow-inner bg-opacity-[3%] flex flex-col">
          <span className="font-medium select-none opacity-[85%] border-b-[2px] pb-[1px] border-opacity-[3%] border-white w-fit">
            Do you have socials?
          </span>
          <div className="text-md mt-1 opacity-50 flex gap-x-2.5">
            <button
              onClick={() =>
                window.open("https://x.com/Liquidify_gg", "_blank")
              }
              className="scale-[0.8] group rounded-full cursor-pointer"
            >
              <img
                src="/x.png"
                className="h-full select-none h-6 w-6 pointer-events-none group-hover:opacity-90 opacity-[70%] transition-all"
              />
            </button>
            <button
              onClick={() =>
                window.open("https://discord.gg/jATKMvu7VW", "_blank")
              }
              className="group rounded-full cursor-pointer"
            >
              <img
                src="/discord.webp"
                className="h-full select-none h-6 w-6  pointer-events-none group-hover:opacity-90 opacity-[70%] transition-all"
              />
            </button>
          </div>
        </div>

        <div className="text-white bg-white p-3 rounded-lg shadow-inner bg-opacity-[3%] flex flex-col">
          <span className="font-medium select-none opacity-[85%] border-b-[2px] pb-[1px] border-opacity-[3%] border-white w-fit">
            Which NFT will I get when I unwrap?
          </span>
          <span className="text-md mt-1 opacity-50">
            You will get the last NFT wrapped into the contract for the specific
            tier/rarity you unwrap for.
          </span>
        </div>
        <div className="text-white bg-white p-3 rounded-lg shadow-inner bg-opacity-[3%] flex flex-col">
          <span className="font-medium select-none opacity-[85%] border-b-[2px] pb-[1px] border-opacity-[3%] border-white w-fit">
            I created an LNFT pair, now what?
          </span>
          <span className="text-md mt-1 opacity-50">
            Once you've created a Fluidly contract for your collection and
            enabled the pair, just start wrapping the NFTs you'd like to fund
            for the LP. When you're done wrapping the NFTs, just head over to
            Uniswap and create a liquidity pool.
          </span>
        </div>

        <div className="text-white bg-white p-3 rounded-lg shadow-inner bg-opacity-[3%] flex flex-col">
          <span className="font-medium select-none opacity-[85%] border-b-[2px] pb-[1px] border-opacity-[3%] border-white w-fit">
            Will I always be able to trade my tokens for an NFT?
          </span>
          <span className="text-md mt-1 opacity-50">
            Yes, as long as it meets the required tokens. The required tokens
            are exactly the amount that the NFT was traded for initially. The
            token to nft amount and the nft to token amount will always be equal
            and are immutable for each NFT. This is however, subject to rarity
            if they are enabled for the project.
          </span>
        </div>

        <div className="text-white bg-white p-3 rounded-lg shadow-inner bg-opacity-[3%] flex flex-col">
          <span className="font-medium select-none opacity-[85%] border-b-[2px] pb-[1px] border-opacity-[3%] border-white w-fit">
            Why are there no NFTs to unwrap in a tier?
          </span>
          <span className="text-md mt-1 opacity-50">
            The NFTs you can unwrap are based on NFTs that have been wrapped.
          </span>
        </div>
        <div className="text-white bg-white p-3 rounded-lg shadow-inner bg-opacity-[3%] flex flex-col">
          <span className="font-medium select-none opacity-[85%] border-b-[2px] pb-[1px] border-opacity-[3%] border-white w-fit">
            Why do I see more than one of the same collection?
          </span>
          <span className="text-md mt-1 opacity-50">
            An infinite number of LNFT pairs can be created for the same
            collection, they may vary in liquidity pools if you are looking to
            trade these tokens. Collections with a verified badge show a certain
            standard of liquidity quality and by no means are an endorsement.
          </span>
        </div>
        <div className="text-white bg-white p-3 rounded-lg shadow-inner bg-opacity-[3%] flex flex-col">
          <span className="font-medium select-none opacity-[85%] border-b-[2px] pb-[1px] border-opacity-[3%] border-white w-fit">
            What are the risks?
          </span>
          <span className="text-md mt-1 opacity-50">
            Liquidfy v3 is a permissionless protocol - while our contracts have
            been thoroughly reviewed, kept minimally complex. It is important to
            be aware of smart contract risks. Get in touch with us if you find
            an issue, we offer whitehat bounties.
          </span>
        </div>
        {/* <div className="text-white flex flex-col">
            <span className="font-medium select-none">
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
    </>
  );
};

export default FaqPage_Faq;
