import { NextRequest, NextResponse } from "next/server";
import { ethers, JsonRpcProvider } from "ethers";
import { connectToDatabase } from "@/libs/database";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const wallet = url.searchParams.get("wallet");

    if (!wallet) {
      return new NextResponse(
        JSON.stringify({
          message: "Missing wallet",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const db = await connectToDatabase();

    const ownedPairs = await db
      .collection("liquidNfts")
      .find({
        lnftPairCreator: { $regex: new RegExp(wallet, "i") },
      })
      .toArray();

    return new NextResponse(JSON.stringify({ ownedPairs: ownedPairs }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e: any) {
    console.error(e);
    return new NextResponse(JSON.stringify({ message: e.toString() }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
