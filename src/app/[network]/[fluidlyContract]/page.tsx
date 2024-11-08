"use client";

import React from "react";
import "../../globals.css";
import { useState, useEffect } from "react";
import LegacyWrapUnwrap from "@/components/WrapUnwrap/Legacy";
import { LoaderIcon } from "lucide-react";
import { WrapUnwrapV3A } from "@/components/WrapUnwrap/V3A/Collection";

export default function wrapUnwrap({
  params,
}: {
  params: { network: string; fluidlyContract: string };
}) {
  const [selectedCollection, setSelectedCollection] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      const response = await fetch(
        `/api/collections/get?contract=${params.fluidlyContract}&network=${params.network}`
      );

      const data = await response.json();

      setSelectedCollection(data.collection);
      setLoading(false);
    };

    load();
  }, [params.fluidlyContract]);

  return (
    <>
      <div className="flex flex-col w-screen h-screen">
        {selectedCollection !== undefined && (
          <>
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
          </>
        )}

        {!selectedCollection && !loading && (
          <>
            <div className="text-white h-screen flex-col w-full flex items-center justify-center">
              <span className="font-medium select-none">
                Could not find the selected collection
              </span>
              <span className="opacity-70 text-sm">
                Please ensure the URL has the correct network and contract.
              </span>
            </div>
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
