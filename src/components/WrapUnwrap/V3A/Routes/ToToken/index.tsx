import { LoaderIcon } from "lucide-react";
import { useState } from "react";

export const ToToken: React.FC<{ selectedCollection: any }> = ({
  selectedCollection,
}) => {
  const [loading, setLoading] = useState<boolean>(true);

  const loadedOwnedNfts = async () => {};

  return (
    <div className="flex flex-col">
      <span className="text-white text-opacity-70 text-lg font-medium">
        Select any of your NFTs to convert into $
        {selectedCollection.tokenSymbol}.
      </span>

      {selectedCollection?.type == "ERC721" && <></>}
      {selectedCollection?.type == "ERC1155" && <></>}

      {/* {loading && (
        <>
          <LoaderIcon className="absolute bottom-0 opacity-70 right-3.5 bottom-3.5 animate-spin text-white" />
        </>
      )} */}
    </div>
  );
};
