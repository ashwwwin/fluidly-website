"use client";

import { ChevronDown, ChevronUp, Eye, Terminal, X } from "lucide-react";
import { useState } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const [showContext, setShowContext] = useState<boolean>(false);
  return (
    <div className="text-white h-screen flex-col w-full flex items-center justify-center">
      <span className="font-medium select-none">
        Something went wrong on our end
      </span>
      <span className="opacity-70 text-sm">
        If this issue persists, please contact the Fluidly team.
      </span>
      <span className="absolute bottom-0 left-0 w-full flexbg-white bg-opacity-10">
        <div
          onClick={() => {
            setShowContext(!showContext);
          }}
          className="cursor-pointer flex group bg-white bg-opacity-10 justify-between py-1.5 px-2.5 rounded-t-lg select-none text-sm w-full items-center"
        >
          <span className="flex opacity-70 group-hover:opacity-100 transition-all duration-[125ms]">Logs</span>
          <span className="opacity-70 group-hover:opacity-100 transition-all duration-[125ms]">
            {showContext ? (
              <ChevronDown className="h-[15px] mr-0.5 font-mono" />
            ) : (
              <ChevronUp className="h-[15px] mr-0.5 font-mono" />
            )}
          </span>
        </div>
        <div
          className={`${
            showContext
              ? "border-t-[1.5px] border-white border-opacity-10 flex flex-col gap-y-2"
              : "hidden"
          } bg-white text-xs font-mono bg-opacity-10 p-2 rounded-b-lg w-full max-h-[150px] overflow-y-scroll`}
        >
          <span>{`${error.message}`}</span>
          <span>{`${error.stack}`}</span>
        </div>
      </span>
    </div>
  );
}
