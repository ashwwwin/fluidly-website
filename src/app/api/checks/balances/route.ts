import { NextRequest, NextResponse } from "next/server";
import { ethers, JsonRpcProvider } from "ethers";
import LiquidERC721 from "../../../../../src/app/abi/LiquidERC721.json";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const wallet = url.searchParams.get("wallet");
    const contract = url.searchParams.get("contract");
    const network = url.searchParams.get("network");

    if (!wallet || !contract) {
      return new NextResponse(
        JSON.stringify({
          message: "Missing account or contractAddress query parameters",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const provider = new JsonRpcProvider(
      `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
    );

    const _contract = new ethers.Contract(contract, LiquidERC721.abi, provider);
    const balance = await _contract.balanceOf(wallet);

    console.log(balance);

    return new NextResponse(JSON.stringify({ balance: balance.toString() }), {
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
