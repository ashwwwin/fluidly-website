import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../libs/database";

export async function GET(request: NextRequest) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("liquidNfts");
    const liquidNfts = await collection.find({}).toArray();
    console.log(liquidNfts);
    return new NextResponse(JSON.stringify({ liquidNfts }), {
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
