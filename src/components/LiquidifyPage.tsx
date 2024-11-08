"use client";

import React, { useEffect, useState } from "react";
import "../app/globals.css";
import CreatePage from "./Creators/CreateToken";
import ManagePage from "./Creators/Manage/Legacy/List";

const LiquidifyPage = ({ tab }: { tab: "manage" | "liquidify" }) => {
  return (
    <div className="flex w-full flex-col h-full">
      {tab == "manage" && (
        <>
          <ManagePage />
        </>
      )}

      {tab == "liquidify" && (
        <>
          <CreatePage />
        </>
      )}
    </div>
  );
};

export default LiquidifyPage;
