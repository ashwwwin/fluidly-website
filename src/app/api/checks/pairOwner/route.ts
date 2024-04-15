import { NextRequest, NextResponse } from "next/server";
import { ethers, JsonRpcProvider } from "ethers";
import { connectToDatabase } from "../../../../libs/database";

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

    let provider;
    if (network == "Base") {
      provider = new JsonRpcProvider(
        `https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY_BASE}`
      );
    } else {
      provider = new JsonRpcProvider(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
      );
    }

    const _contract = new ethers.Contract(
      contract,
      ["function pairCreator() view returns (address)"],
      provider
    );

    const pairCreator = (await _contract.pairCreator()).toString();

    console.log(pairCreator);

    await collection.updateOne(
      { liquidifyContract: { $regex: new RegExp(`^${contract}$`, "i") } },
      { $set: { lnftPairCreator: pairCreator } }
    );

    return new NextResponse(JSON.stringify({ newPairOwner: pairCreator }), {
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
