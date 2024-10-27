import { NextRequest, NextResponse } from "next/server";
import { ethers, JsonRpcProvider } from "ethers";
import { connectToDatabase } from "../../../../libs/database";
import { getAlchemyBase } from "@/libs/alchemyBase";
import { isLiquidifyNFT } from "@/components/Tools/isLiquidifyNFT";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const wallet = url.searchParams.get("wallet");
    const contract = url.searchParams.get("contract");
    const network = url.searchParams.get("network");
    const tokenId = url.searchParams.get("tokenId");

    if (!wallet || !contract || !tokenId || !network) {
      return new NextResponse(
        JSON.stringify({
          message:
            "Missing wallet, contract, network or tokenId query parameters",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (!(await isLiquidifyNFT(contract, { isEnabled: true })))
      return new NextResponse("", {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });

    let alchemyBase = await getAlchemyBase(network);

    let provider = new JsonRpcProvider(
      `${alchemyBase.url}/v2/${alchemyBase.key}`
    );

    const _contract = new ethers.Contract(
      contract,
      [
        "function balanceOf(address _owner, uint256 _id) view returns (uint256)",
      ],
      provider
    );

    const balance = (await _contract.balanceOf(wallet, tokenId)).toString();

    console.log(balance);

    return new NextResponse(JSON.stringify({ balance }), {
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
