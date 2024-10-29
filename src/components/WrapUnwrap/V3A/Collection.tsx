import { FC } from "react";
import { useState, useEffect } from "react";
import { ToNFT } from "./Routes/ToNFT";
import { ToToken } from "./Routes/ToToken";

export const WrapUnwrapV3A: FC<{ selectedCollection: any }> = ({
  selectedCollection,
}) => {
  const [tab, setTab] = useState<"toToken" | "toNFT">("toToken");
  return (
    <div className="flex flex-col w-screen h-screen text-white pt-[57px]">
      <div className="flex flex-col py-3 w-full bg-white bg-opacity-5">
        <div className="flex px-6">
          <img
            src={selectedCollection?.nftProjectImage || "/temp.png"}
            className="h-[65px] select-none w-[65px] rounded-md overflow-none"
          />
          <div className="flex flex-col ml-3">
            <span>{selectedCollection?.tokenName}</span>
          </div>
        </div>
      </div>
      <div className="px-3 w-full mt-3.5">
        <div className="w-fit p-1 bg-white select-none bg-opacity-5 rounded-lg gap-x-1 flex">
          <button
            onClick={() => {
              setTab("toNFT");
            }}
            className={`bg-white px-3 transition-all duration-[150ms] font-medium py-1.5 rounded-md ${
              tab == "toNFT"
                ? "text-blue-500 bg-opacity-10"
                : "hover:bg-opacity-10 bg-opacity-0"
            }`}
          >
            NFTs
          </button>
          <button
            onClick={() => {
              setTab("toToken");
            }}
            className={`bg-white px-3 transition-all duration-[150ms] font-medium py-1.5 rounded-md ${
              tab == "toToken"
                ? "text-blue-500 bg-opacity-10"
                : "hover:bg-opacity-10 bg-opacity-0"
            }`}
          >
            Owned
          </button>
        </div>
      </div>

      <div className="flex h-full px-5 mt-2">
        {tab == "toNFT" && (
          <>
            <ToNFT selectedCollection={selectedCollection} />
          </>
        )}

        {tab == "toToken" && (
          <>
            <ToToken selectedCollection={selectedCollection} />
          </>
        )}
      </div>
    </div>
  );
};
