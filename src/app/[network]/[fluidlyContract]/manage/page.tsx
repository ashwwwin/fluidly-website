"use client";

import ManageCollectionPage from "@/components/Creators/Manage/Legacy/Panel";
import { getCollection } from "@/components/Tools/getCollection";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { LoaderIcon } from "react-hot-toast";

export default function ManageCollection({
  params,
}: {
  params: { fluidlyContract: string; network: string };
}) {
  const [collection, setCollection] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!params.fluidlyContract || !params.network) return;

    const load = async () => {
      console.log("contractAddress", params.fluidlyContract);
      console.log("network", params.network);
      const data = await getCollection(params.fluidlyContract, params.network);

      if (!data) return;
      const _data = await JSON.parse(data);
      if (!_data) return;
      setCollection(_data);
      setLoading(false);
    };

    load();
  }, [params.fluidlyContract, params.network]);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center">
        <link rel="icon" href="/icon.png" />
        <title>Fluidly</title>

        <div className="flex items-center flex-col gap-y-5 h-full mx-5 mt-[78px] opacity-90">
          {collection?.version !== "Fluidly" && (
            <ManageCollectionPage manage={collection} />
          )}
        </div>
        {loading && (
          <>
            <Loader className="absolute opacity-70 right-3.5 bottom-3.5 animate-spin text-white" />
          </>
        )}

        {!collection && !loading && (
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
      </main>
    </>
  );
}
