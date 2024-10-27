import { connectToDatabase } from "@/libs/database";

export const isLiquidifyToken = async (
  tokenAddress: string,
  options?: {
    isEnabled?: boolean;
  }
) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("liquidNfts");

    let searchParams: {} = { liquidifyContract: tokenAddress };
    if (options?.isEnabled)
      searchParams = { ...searchParams, pairEnabled: true };

    const collections = await collection.findOne(searchParams)

    if (!collections) return false;

    return true;
  } catch (error) {
    console.error("Failed to check if isLiquidifyToken:", error);
    return false;
  }
};
