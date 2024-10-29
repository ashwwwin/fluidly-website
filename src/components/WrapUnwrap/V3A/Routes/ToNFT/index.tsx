import { LoaderIcon } from "lucide-react";
import { useState } from "react";

export const ToNFT: React.FC<{ selectedCollection: any }> = ({
  selectedCollection,
}) => {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <div className="flex flex-col">
      <span className="text-white text-opacity-70 text-lg font-medium">
        Convert ${selectedCollection.tokenSymbol} into any NFT you select below.
      </span>
      {loading && (
        <>
          <LoaderIcon className="absolute bottom-0 opacity-70 right-3.5 bottom-3.5 animate-spin text-white" />
        </>
      )}
    </div>
  );
};
