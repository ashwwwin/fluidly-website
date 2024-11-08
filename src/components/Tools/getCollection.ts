"use server";

import { connectToDatabase } from "@/libs/database";

export const getCollection = async (
  contractAddress: string,
  network: string
) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("liquidNfts");

    const data = await collection.findOne({
      liquidifyContract: { $regex: new RegExp(`^${contractAddress}$`, "i") },
      network: { $regex: new RegExp(`^${network}$`, "i") },
    });

    return JSON.stringify(data);
  } catch (error) {
    console.error("Failed to get collection:", error);
    return null;
  }
};
