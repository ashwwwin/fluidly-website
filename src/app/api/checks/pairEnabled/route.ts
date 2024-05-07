import { NextRequest, NextResponse } from "next/server";
import { ethers, JsonRpcProvider } from "ethers";
import { connectToDatabase } from "../../../../libs/database";
import { getAlchemyBase } from "@/libs/alchemyBase";

export async function GET(request: NextRequest) {
  try {
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

    const db = await connectToDatabase();
    const collection = db.collection("liquidNfts");

    const pairEnabledCheck = await collection.findOne({
      liquidifyContract: { $regex: new RegExp(`^${contract}$`, "i") },
      pairEnabled: true,
    });

    // Since it can only be enabled once (and never disabled), just check if true and return
    if (pairEnabledCheck) {
      return new NextResponse(JSON.stringify({ pairEnabled: true }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    let alchemyBase = await getAlchemyBase(network);

    let provider = new JsonRpcProvider(
      `${alchemyBase.url}/v2/${alchemyBase.key}`
    );

    const _contract = new ethers.Contract(
      contract,
      ["function pairEnabled() view returns (bool)"],
      provider
    );

    const pairEnabled = await _contract.pairEnabled();

    // If false do nothing (bc contract can only be set to enabled)
    if (pairEnabled == false) {
      return new NextResponse(JSON.stringify({ pairEnabled: false }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    await collection.updateOne(
      { liquidifyContract: { $regex: new RegExp(`^${contract}$`, "i") } },
      { $set: { pairEnabled: pairEnabled } }
    );

    return new NextResponse(JSON.stringify({ pairEnabled: pairEnabled }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e: any) {
    return new NextResponse(
      JSON.stringify({
        message: "Failed",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
