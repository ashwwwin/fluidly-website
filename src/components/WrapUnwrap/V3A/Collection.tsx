import { FC } from "react";
import { useState, useEffect } from "react";
import { ToNFT } from "./Routes/ToNFT";
import { ToToken } from "./Routes/ToToken";
import { useERC20Balance } from "../../../../store/useERC20Balance";

export const WrapUnwrapV3A: FC<{ selectedCollection: any }> = ({
  selectedCollection,
}) => {
  const [tab, setTab] = useState<"toToken" | "toNFT">("toToken");
  const { ERC20Balance, setERC20Balance } = useERC20Balance();

  useEffect(() => {
    if (!selectedCollection) return;
    setERC20Balance(selectedCollection.tokensPerNft);
  }, [selectedCollection]);

  return (
    <div className="flex flex-col w-screen h-screen text-white pt-[57px]">
      <div className="flex flex-col py-3 w-full bg-white bg-opacity-10">
        <div className="flex px-6">
          <img
            src={selectedCollection?.nftProjectImage || "/temp.png"}
            className="h-[65px] select-none w-[65px] rounded-md overflow-none"
          />
          <div className="flex flex-col ml-3">
            <span>{selectedCollection?.tokenName}</span>
            <div className="flex items-center mt-1.5 gap-x-2 justify-left h-[20px] mb-4">
              <img
                src="/opensea.png"
                onClick={() => {
                  window.open(
                    `https://opensea.io/assets/${selectedCollection?.network.toLowerCase()}/${
                      selectedCollection?.nftAddress
                    }`
                  );
                }}
                className="min-h-[20px] select-none cursor-pointer opacity-70 hover:opacity-100 transition-all min-w-[20px] max-h-[20px] max-w-[20px] rounded-md overflow-none"
              />
              <img
                src="/etherscan.svg"
                className="min-h-[20px] select-none cursor-pointer opacity-70 hover:opacity-100 transition-all min-w-[20px] max-h-[20px] max-w-[20px] rounded-md overflow-none"
                onClick={() => {
                  let baseUrl =
                    selectedCollection?.network == "Ethereum"
                      ? "https://etherscan.io/token/"
                      : selectedCollection?.network === "Base"
                      ? "https://basescan.org/token/"
                      : selectedCollection?.network === "Polygon"
                      ? "https://polygonscan.com/token/"
                      : selectedCollection?.network === "Blast"
                      ? "https://blastscan.io/token/"
                      : selectedCollection?.network === "Arbitrum"
                      ? "https://arbiscan.io/token/"
                      : selectedCollection?.network === "Optimism"
                      ? "https://optimistic.etherscan.io/token/"
                      : "";
                  window.open(
                    `${baseUrl}${selectedCollection?.liquidifyContract}`
                  );
                }}
              />
              <img
                src="/uniswap.png"
                onClick={() => {
                  window.open(
                    `https://app.uniswap.org/explore/tokens/${selectedCollection.network.toLowerCase()}/${
                      selectedCollection?.liquidifyContract
                    }`
                  );
                }}
                className="min-h-[20px] select-none cursor-pointer opacity-70 hover:opacity-100 transition-all min-w-[20px] max-h-[20px] max-w-[20px] rounded-md overflow-none"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 w-full flex justify-between mt-3.5">
        <div className="w-fit p-1 bg-white text-sm bg-opacity-10 rounded-lg gap-x-1 flex">
          <button
            onClick={() => {
              setTab("toNFT");
            }}
            className={`bg-white px-3 transition-all select-none duration-[150ms] font-medium py-1.5 rounded-md ${
              tab == "toNFT"
                ? "text-blue-500 bg-opacity-10"
                : "hover:bg-opacity-10 bg-opacity-0"
            }`}
          >
            NFT Pool
          </button>
          <button
            onClick={() => {
              setTab("toToken");
            }}
            className={`bg-white px-3 transition-all select-none duration-[150ms] font-medium py-1.5 rounded-md ${
              tab == "toToken"
                ? "text-blue-500 bg-opacity-10"
                : "hover:bg-opacity-10 bg-opacity-0"
            }`}
          >
            Owned
          </button>
        </div>
        <div className="w-fit text-opacity-70 text-white px-3 py-1 bg-white items-center text-sm bg-opacity-10 rounded-lg gap-x-1 flex">
          {ERC20Balance.toLocaleString()} ${selectedCollection.tokenSymbol}
        </div>
      </div>

      <div className="flex h-full px-6 mt-2">
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
