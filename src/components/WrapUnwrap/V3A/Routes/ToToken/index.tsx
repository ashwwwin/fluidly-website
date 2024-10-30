import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import { OwnedERC1155Display } from "./OwnedNFTsDisplay/ERC1155";
import { OwnedERC721Display } from "./OwnedNFTsDisplay/ERC721";

export const ToToken: React.FC<{ selectedCollection: any }> = ({
  selectedCollection,
}) => {
  return (
    <div className="flex flex-col">
      {selectedCollection?.type == "ERC721" && (
        <>
          <OwnedERC721Display selectedCollection={selectedCollection} />
        </>
      )}

      {selectedCollection?.type == "ERC1155" && (
        <>
          <OwnedERC1155Display selectedCollection={selectedCollection} />
        </>
      )}
    </div>
  );
};
