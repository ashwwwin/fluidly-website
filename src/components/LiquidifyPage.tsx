"use client";

import { Droplet, HammerIcon, Image, Info, X } from "lucide-react";
import React, { useState } from "react";
import "../app/globals.css";

const LiquidifyPage = () => {
  const [selectedContract, setSelectedContract] = useState<
    "ERC721" | "ERC1155" | undefined
  >(undefined);

  return (
    <div className="flex w-full flex-col h-full">
      <div className="flex flex-col items-center">
        <span className="flex text-2xl text-center justify-center items-center py-1 mt-1 select-none font-medium text-white">
          <Droplet className="h-[18px] mr-2" />
          Liquidify
        </span>
        <span className="text-sm text-white select-none w-[450px] text-center">
          If your collection or a collection you would like to trade as an ERC20
          has already been liquidified there's no need to repeat this process
          unless you know what you're doing.
        </span>
      </div>

      <div className="flex flex-col min-h-[calc(100vh-250px)] items-center justify-center">
        {!selectedContract && (
          <>
            <div className="flex gap-x-3">
              <div
                onClick={() => {
                  setSelectedContract("ERC721");
                }}
                className="cursor-pointer flex-col shadow-xl hover:shadow-none select-none hover:bg-opacity-[7.5%] text-opacity-80 hover:text-opacity-100 text-white h-[250px] font-mono bg-white bg-opacity-5 transition-all border-white border-opacity-5 flex items-center justify-center w-[250px] border-2 rounded-lg"
              >
                <Image className="mb-2" />
                ERC721
              </div>
              <div
                onClick={() => {
                  // setSelectedContract("ERC1155");
                }}
                className="flex flex-col cursor-not-allowed shadow-xl opacity-50 hover:shadow-none select-none text-opacity-80 text-white h-[250px] font-mono bg-white bg-opacity-5 transition-all border-white border-opacity-5 flex items-center justify-center w-[250px] border-2 rounded-lg"
              >
                <HammerIcon className="mb-2"/>
                <span>ERC1155</span>
              </div>
            </div>
          </>
        )}

        {selectedContract && (
          <>
            <div className="p-3 bg-white bg-opacity-5 rounded-md mt-8">
              <div className="text-white mb-5 flex-col gap-y-2.5 flex items-center">
                <span className="select-none">{selectedContract} to wrap</span>
                <input
                  placeholder={`${selectedContract} address`}
                  className="text-white bg-white bg-opacity-10 w-[350px] outline-none py-1.5 px-2 rounded-md"
                />

                {/* {selectedContract == "ERC721" && (
                  <>
                    <input
                      placeholder={`Token ids to wrap (eg. 3583,1218)`}
                      className="text-white bg-white bg-opacity-10 w-[350px] outline-none py-1.5 px-2 rounded-md"
                    />
                    <span className="text-xs -mt-1 select-none w-[350px] text-center">
                      Token ids to wrap are NFTs that belong to you that you
                      would like to wrap. You can unwrap them at any time.
                    </span>
                  </>
                )} */}

                {selectedContract == "ERC1155" && (
                  <>
                    <input
                      placeholder={`Token id`}
                      className="text-white bg-white bg-opacity-10 w-[350px] outline-none py-1.5 px-2 rounded-md"
                    />
                    {/* <input
                      placeholder={`Quantity`}
                      className="text-white bg-white bg-opacity-10 w-[350px] outline-none py-1.5 px-2 rounded-md"
                    />
                    <span className="text-xs -mt-1 select-none w-[350px] text-center">
                      Quantity of NFTs to deposit that belong to you that you
                      would like to wrap. You can unwrap them at any time.
                    </span> */}
                  </>
                )}

                <span className="mt-6 select-none">ERC20 to create</span>
                <input
                  placeholder="Token name"
                  className="text-white bg-white bg-opacity-10 w-[350px] outline-none py-1.5 px-2 rounded-md"
                />
                <input
                  placeholder="Token symbol"
                  className="text-white bg-white bg-opacity-10 w-[350px] outline-none py-1.5 px-2 rounded-md"
                />
                <input
                  placeholder="Tokens per NFT"
                  className="text-white bg-white bg-opacity-10 w-[350px] outline-none py-1.5 px-2 rounded-md"
                />
              </div>

              <span className="mt-3 text-white text-sm w-[350px] flex text-center">
                You can wrap & unwrap NFTs in exchange for tokens after the LNFT
                pair has been created
              </span>
              <div className="flex gap-x-3 mt-5">
                <button
                  onClick={() => {
                    setSelectedContract(undefined);
                  }}
                  className="bg-white select-none hover:bg-opacity-10 transition-all bg-opacity-5 border-2 border-opacity-10 text-white outline-none rounded-md border-white px-3 py-1"
                >
                  Back
                </button>
                <button className="bg-white w-full select-none hover:bg-opacity-10 transition-all bg-opacity-5 border-2 border-opacity-10 text-white outline-none rounded-md border-white px-3 py-1">
                  Create LNFT
                </button>
              </div>
            </div>
            <span
              onClick={() => {
                window.open("");
              }}
              className="flex mb-8 gap-x-2 text-white hover:opacity-100 cursor-pointer select-none opacity-60 text-[15px] w-full items-center justify-center mt-2 text-center"
            >
              If you're stuck, click here watch the tutorial
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default LiquidifyPage;
