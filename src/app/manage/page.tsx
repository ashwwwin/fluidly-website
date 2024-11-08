"use client";

import ManagePage from "@/components/Creators/Manage/Legacy/List";

export default function ManagerList() {

  return (
    <>
      <main className="flex min-h-screen flex-col items-center">
        <link rel="icon" href="/icon.png" />
        <title>Fluidly</title>

        <div className="flex items-center flex-col gap-y-5 h-full mx-5 mt-[78px] opacity-90">
          <ManagePage />
        </div>
      </main>
    </>
  );
}
