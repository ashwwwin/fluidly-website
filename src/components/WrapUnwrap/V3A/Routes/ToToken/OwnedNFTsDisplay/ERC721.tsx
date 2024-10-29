import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useWalletAddress } from "../../../../../../../store/useWalletAddress";

export const OwnedERC721Display: React.FC<{ selectedCollection: any }> = ({
  selectedCollection,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [ownedNFTs, setOwnedNFTs] = useState<any>([]);
  const { walletAddress } = useWalletAddress();

  const loadedOwnedNfts = async (walletAddress: string) => {
    const response = await fetch(
      `/api/checks/ownedERC721?wallet=${walletAddress}&contract=${selectedCollection?.nftAddress}&network=${selectedCollection.network}`
    );
    const data = await response.json();
    console.log(data);
    setOwnedNFTs(data.tokens);
  };

  useEffect(() => {
    console.log("V3A Collection Page walletAddress", walletAddress);
    loadedOwnedNfts(walletAddress);
  }, []);


  return (
    <div className="flex flex-col">
      <span className="text-white text-opacity-70 text-lg font-medium">
        Select any of your NFTs to convert into $
        {selectedCollection.tokenSymbol}.
      </span>

      {loading && (
        <>
          <LoaderIcon className="absolute bottom-0 opacity-70 right-3.5 bottom-3.5 animate-spin text-white" />
        </>
      )}
    </div>
  );
};
