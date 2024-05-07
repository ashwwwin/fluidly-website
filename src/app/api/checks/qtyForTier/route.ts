import { NextRequest, NextResponse } from "next/server";
import { ethers, JsonRpcProvider } from "ethers";
import { connectToDatabase } from "../../../../libs/database";
import { getAlchemyBase } from "@/libs/alchemyBase";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const contract = url.searchParams.get("contract");
    const network = url.searchParams.get("network");
    const tier = url.searchParams.get("tier");

    if (!contract || !network || !tier) {
      return new NextResponse(
        JSON.stringify({
          message: "Missing contract, network or tier",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    let alchemyBase = await getAlchemyBase(network);

    let provider = new JsonRpcProvider(
      `${alchemyBase}/v2/${process.env.ALCHEMY_KEY}`
    );

    const _contract = new ethers.Contract(
      contract,
      [
        "function getQtyForTier(uint256 amount) external view returns (uint256)",
      ],
      provider
    );

    let _tier: string | number = parseInt(tier) * 10 ** 18;
    _tier = _tier.toLocaleString("fullwide", { useGrouping: false });

    const qty = await _contract.getQtyForTier(_tier);
    console.log("qty", qty);

    return new NextResponse(JSON.stringify({ quantity: qty.toString() }), {
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
