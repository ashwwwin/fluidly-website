"use client";

import React from "react";
import "../../globals.css";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import LegacyWrapUnwrap from "@/components/WrapUnwrap/Legacy";
import { Loader2Icon, LoaderIcon } from "lucide-react";
import { WrapUnwrapV3A } from "@/components/WrapUnwrap/V3A/Collection";

export default function wrapUnwrap({
  params,
}: {
  params: { network: string; liquidifyContract: string };
}) {
  const [selectedCollection, setSelectedCollection] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      const response = await fetch(
        `/api/collections/get?contract=${params.liquidifyContract}&network=${params.network}`
      );

      const data = await response.json();

      console.log(data.collection);
      setSelectedCollection(data.collection);
      setLoading(false);
    };

    load();
  }, [params.liquidifyContract]);

  return (
    <>
      <div className="flex flex-col w-screen h-screen">
        {selectedCollection !== undefined && (
          <>
            {/* && selectedCollection.pairEnabled == true */}
            {(selectedCollection?.version.toString() == "2" ||
              selectedCollection?.version.toString() == "3") && (
              <>
                <LegacyWrapUnwrap selectedCollection={selectedCollection} />
              </>
            )}

            {selectedCollection?.version === "Fluidly" && (
              <>
                <WrapUnwrapV3A selectedCollection={selectedCollection} />
              </>
            )}

            {/* {selectedCollection.minting == true && (
              <>
                <MintPage selectedCollection={selectedCollection} />{" "}
              </>
            )} */}
          </>
        )}

        {loading ? (
          <>
            <LoaderIcon className="absolute opacity-70 right-3.5 bottom-3.5 animate-spin text-white" />
          </>
        ) : (
          <>
            {selectedCollection?.minting == false && (
              <>
                <span className="absolute bottom-3.5 text-white font-mono right-3.5 opacity-30 select-none">
                  v{selectedCollection?.version}
                </span>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
