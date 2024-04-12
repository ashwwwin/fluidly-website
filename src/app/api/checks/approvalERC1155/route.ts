import { NextRequest, NextResponse } from "next/server";
import { ethers, JsonRpcProvider, Interface } from "ethers";
import LiquidERC721 from "../../../abi/LiquidERC721.json";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const wallet = url.searchParams.get("wallet");
    const contract = url.searchParams.get("contract");
    const operator = url.searchParams.get("operator"); // The contract we're checking approval for
    const network = url.searchParams.get("network");

    console.log("[approvalERC721] Network is", network);

    if (!wallet || !contract || !operator || !network) {
      return new NextResponse(
        JSON.stringify({
          message:
            "Missing wallet, contract, network or operator query parameters",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
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
    
    console.log(contract, operator);
    const _contract = new ethers.Contract(
      contract,
      [
        "function isApprovedForAll(address owner, address operator) view returns (bool)",
      ],
      provider
    );

    const isApproved = await _contract.isApprovedForAll(wallet, operator);

    console.log(isApproved);

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
