"use client";

import {
  BookCheckIcon,
  Droplet,
  HelpCircle,
  ImageIcon,
  ImagesIcon,
  Info,
  InfoIcon,
  MousePointerClickIcon,
  PencilRuler,
  StarsIcon,
  Wallet,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import CollectionPage from "../../components/CollectionPage";
import LiquidifyPage from "../../components/LiquidifyPage";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import FaqPage from "@/components/FaqPage";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import CreatePage from "@/components/Liquidify/Create";
import ManagePage from "@/components/Liquidify/Manage";

export default function Faq() {

  return (
    <>
      <main className="flex min-h-screen flex-col items-center">
        <link rel="icon" href="/icon.png" />
        <title>Fluidly</title>

        <div className="flex items-center flex-col gap-y-5 h-full mx-5 mt-[85px] opacity-90">
          <ManagePage />
        </div>
      </main>
    </>
  );
}
