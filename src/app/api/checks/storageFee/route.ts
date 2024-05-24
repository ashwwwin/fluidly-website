import { NextRequest, NextResponse } from "next/server";
import { ethers, JsonRpcProvider } from "ethers";
import { connectToDatabase } from "../../../../libs/database";
import { getAlchemyBase } from "@/libs/alchemyBase";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const factoryAddress = url.searchParams.get("factoryAddress");
    const contract = url.searchParams.get("contract");
    const quantity = url.searchParams.get("quantity");
    const network = url.searchParams.get("network");

    if (!contract || !network || !factoryAddress || !quantity) {
      return new NextResponse(
        JSON.stringify({
          message: "Missing contract, factoryAddress, quantity or network",
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
      `${alchemyBase.url}/v2/${alchemyBase.key}`
    );

    const _contract = new ethers.Contract(
      factoryAddress,
      [
        "function storageFee(address liquidifyContract, uint256 quantity) external view returns (uint256)",
      ],
      provider
    );

    const storageFee = (
      await _contract.storageFee(contract, quantity)
    ).toString();

    console.log("Storage fee:", storageFee);

    return new NextResponse(
      JSON.stringify({
        storageFee: `${(parseInt(storageFee) / 10 ** 18).toString()}`,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (e: any) {
    console.log(e);
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
