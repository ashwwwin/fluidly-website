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

export default function Faq() {


  const [collections, setCollections] = useState<any>(undefined);

  useEffect(() => {
    const fetchCollections = async () => {
      const response = await fetch("/api/collections/all");

      const data = await response.json();
      console.log(data);
      setCollections(data);
    };

    fetchCollections().catch(console.error);

    // Cleanup function to prevent effect from running more than once
    return () => {};
  }, []);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center">
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: "",
            style: {
              padding: "5px",
              color: "white",
              backgroundColor: "#0d0d0d",
            },
          }}
        />
        <link rel="icon" href="/icon.png" />
        <title>Liquidify.gg</title>

        <Navbar page="faq" />

        <div className="flex items-center flex-col gap-y-5 h-full mx-5 mt-[85px] opacity-90">
          <FaqPage />
        </div>
      </main>
    </>
  );
}
