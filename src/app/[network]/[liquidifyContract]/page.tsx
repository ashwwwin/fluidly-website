"use client";

import React from "react";
import "../../globals.css";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import LegacyWrapUnwrap from "@/components/WrapUnwrap/Legacy";
import { Loader2Icon, LoaderIcon } from "lucide-react";

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
        <Navbar page="collection" />
        {selectedCollection !== undefined && (
          <>
            {(selectedCollection.version.toString() == "2" ||
              selectedCollection.version.toString() == "3" ||
              selectedCollection.version.toString() == "Mutatio") && (
              <>
                <LegacyWrapUnwrap selectedCollection={selectedCollection} />
              </>
            )}
          </>
        )}

        {loading ? (
          <>
            <LoaderIcon className="absolute opacity-[35%] right-3.5 bottom-3.5 animate-spin text-white" />
          </>
        ) : (
          <>
            <span className="absolute bottom-3.5 text-white font-mono right-3.5 opacity-10 select-none">
              {selectedCollection.version == "Mutatio"
                ? "Mutatio Flies by XCOPY x NEONGLITCH86"
                : `v${selectedCollection?.version}`}
            </span>
          </>
        )}
      </div>
    </>
  );
}
