import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../libs/database";

export async function GET(request: NextRequest) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("liquidNfts");

    const url = new URL(request.url);
    const contract = url.searchParams.get("contract");
    const network = url.searchParams.get("network");

    if (!contract || !network) {
      return new NextResponse(
        JSON.stringify({
          message: "Missing contract or network",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    let _collection = await collection.findOne({
      liquidifyContract: { $regex: new RegExp(`^${contract}$`, 'i') },
      network: { $regex: new RegExp(`^${network}$`, 'i') },
    });

    return new NextResponse(JSON.stringify({ collection: _collection }), {
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

export const dynamic = "force-dynamic";
