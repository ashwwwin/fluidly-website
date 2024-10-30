import { LoaderIcon } from "lucide-react";
import { useState } from "react";

export const OwnedERC1155Display: React.FC<{ selectedCollection: any }> = ({
  selectedCollection,
}) => {
  const [loading, setLoading] = useState<boolean>(true);

  const loadedOwnedNfts = async () => {};

  return (
    <div className="flex flex-col">
      <span className="text-white text-opacity-70 mt-2.5 text-md font-medium">
        Convert ${selectedCollection.tokenSymbol} into selected NFTs.
      </span>

      {loading && (
        <>
          <LoaderIcon className="absolute bottom-0 opacity-70 right-3.5 bottom-3.5 animate-spin text-white" />
        </>
      )}
    </div>
  );
};
