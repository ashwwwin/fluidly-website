"use client";

import { Crown, HelpCircle, Info, Leaf, PieChart } from "lucide-react";
import React from "react";
import "../../app/globals.css";

const FaqPage_Token = () => {
  return (
    <>
      <div className="items-center bg-white text-white mt-1 rounded-sm py-1 bg-opacity-0 transition-all text-2xl rounded-md select-none text-opacity-100">
        <div className="flex items-center font-medium">
          <PieChart className="h-[18px] mr-1.5" /> $LIQ
        </div>
      </div>
      <div className="flex flex-col p-3 opacity-50 gap-y-5 mt-1 mb-12 w-full mx-auto text-left">
        <span className="text-white">
          Liquidify's native token ($LIQ), will be launched when/if protocol
          revenue's are healthy enough to sustain the token naturally. It is
          entirely conditional.
        </span>
        <span className="text-white">
          The protocol earns 0.25% from token sells when royalties are enabled for
          a collection and earns 0.0002 ETH per NFT wrapped/unwrapped. 50% of
          that revenue will be used to buy & burn $LIQ.
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
        </span>
      </div>
    </>
  );
};

export default FaqPage_Token;
