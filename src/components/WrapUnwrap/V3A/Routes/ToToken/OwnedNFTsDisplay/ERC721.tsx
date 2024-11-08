import { Check, CheckCircle2, LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useWalletSettings } from "../../../../../../../store/useWalletSettings";

export const OwnedERC721Display: React.FC<{ selectedCollection: any }> = ({
  selectedCollection,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [ownedNFTs, setOwnedNFTs] = useState<any>([]);
  const { walletAddress } = useWalletSettings();
  const [selectedNFTs, setSelectedNFTs] = useState<string[]>([]);

  const loadedOwnedNfts = async (walletAddress: string) => {
    const response = await fetch(
      `/api/checks/ownedERC721?wallet=${walletAddress}&contract=${selectedCollection?.nftAddress}&network=${selectedCollection.network}&metadata=true`
    );
    const data = await response.json();
    console.log(data);
    setOwnedNFTs(data.tokens);
    setLoading(false);
  };

  useEffect(() => {
    console.log("V3A Collection Page walletAddress", walletAddress);
    loadedOwnedNfts(walletAddress);
  }, []);

  return (
    <div className="flex flex-col">
      <span className="text-white text-opacity-70 mt-2.5 text-md font-medium">
        Select NFTs to convert into ${selectedCollection.tokenSymbol}
      </span>
      <div className="flex flex-wrap gap-2.5 mt-2.5">
        {ownedNFTs.map((nft: any) => {
          return (
            <div
              onClick={() => {
                if (selectedNFTs.includes(nft.tokenId)) {
                  setSelectedNFTs(
                    selectedNFTs.filter((id) => id !== nft.tokenId)
                  );
                  return;
                }

                setSelectedNFTs([...selectedNFTs, nft.tokenId]);
              }}
              className="relative flex w-fit group hover:translate-y-[-2px] flex-col gap-y-1 p-1 rounded-md bg-white bg-opacity-10 cursor-pointer transition-all duration-[100ms]"
            >
              <img
                className="h-[150px] pointer-events-none select-none w-[150px] min-w-[150px] min-h-[150px] max-w-[150px] max-h-[150px] object-cover rounded-[3.8px] overflow-hidden"
                src={nft.image || "/temp.png"}
              />
              <span className="text-white w-full text-center text-opacity-70 text-sm">
                #{nft.tokenId}
              </span>

              {selectedNFTs.includes(nft.tokenId) && (
                <>
                  <div className="absolute opacity-50 top-3 bg-[#272727] right-3 border-white flex items-center justify-center h-5 w-5 rounded-ful">
                    <CheckCircle2 className="h-full w-full text-white " />
                  </div>
                  {/* <div className="absolute opacity-50 top-3 right-3 border-white flex items-center justify-center h-5 w-5 rounded-full bg-blue-500 border-[1px]">
                  <Check className="h-3 h-3 text-white " />
                </div> */}
                </>
              )}
            </div>
          );
        })}
      </div>
      {selectedNFTs.length > 0 && (
        <div className="absolute bottom-3 right-3"></div>
      )}

      {loading && (
        <>
          <LoaderIcon className="absolute bottom-0 opacity-70 right-3.5 bottom-3.5 animate-spin text-white" />
        </>
      )}
    </div>
  );
};
