import { NextRequest, NextResponse } from "next/server";
import { ethers, JsonRpcProvider, Interface } from "ethers";
import LiquidERC721 from "../../../../../src/app/abi/LiquidERC721.json";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const wallet = url.searchParams.get("wallet");
    const contract = url.searchParams.get("contract");
    const operator = url.searchParams.get("operator"); // The contract we're checking approval for

    if (!wallet || !contract || !operator) {
      return new NextResponse(
        JSON.stringify({
          message: "Missing wallet, contract, or operator query parameters",
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

    const isApprovedForAllInterface = new Interface([
      "function isApprovedForAll(address owner, address operator) view returns (bool)",
    ]);

    const _contract = new ethers.Contract(
      contract,
      isApprovedForAllInterface,
      provider
    );
    const isApproved = await _contract.isApprovedForAll(wallet, operator);

    return new NextResponse(JSON.stringify({ isApproved }), {
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
