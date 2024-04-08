import { NextRequest, NextResponse } from "next/server";
import { ethers, JsonRpcProvider } from "ethers";
import LiquidERC721 from "../../../../../src/app/abi/LiquidERC721.json";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const wallet = url.searchParams.get("wallet");
    const contract = url.searchParams.get("contract");
    const network = url.searchParams.get("network");

    console.log("[balances] Network is", network);

    if (!wallet || !contract || !network) {
      return new NextResponse(
        JSON.stringify({
          message: "Missing wallet, contract or network query parameters",
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

    const _contract = new ethers.Contract(
      contract,
      ["function balanceOf(address _owner) view returns (uint256)"],
      provider
    );

    const balance = (await _contract.balanceOf(wallet)).toString();

    console.log(balance);

    return new NextResponse(JSON.stringify({ balance: balance }), {
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
