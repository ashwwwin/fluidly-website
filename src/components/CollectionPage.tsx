"use client";

import { BookCheckIcon, Info } from "lucide-react";
import React from "react";
import "../app/globals.css";
import { useState, useEffect } from "react";

const CollectionPage = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      const response = await fetch("/api/collections");

      const data = await response.json();
      console.log(data);
      setCollections(data);
    };

    fetchCollections().catch(console.error);
  }, []);

  return (
    <>
      <div className="flex w-full">
        <span className="flex text-2xl items-center py-1 mt-1 select-none font-medium text-white">
          <BookCheckIcon className="h-[18px] mr-2" />
          Collections
        </span>
      </div>
    </>
  );
};

export default CollectionPage;
