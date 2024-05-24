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
    const type = url.searchParams.get("type");
    const tokenId = url.searchParams.get("tokenId");

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

    let alchemyBase = await getAlchemyBase(network);

    let provider = new JsonRpcProvider(
      `${alchemyBase.url}/v2/${alchemyBase.key}`
    );

    const _contract = new ethers.Contract(
      contract,
      [
        "function getQtyForTier(uint256 amount) external view returns (uint256)",
        "function storedNfts(uint256 amount) external view returns (uint256)",
      ],
      provider
    );

    if (type == "ERC1155") {
      if (!tokenId) {
        return new NextResponse(
          JSON.stringify({
            message: "Missing tokenId",
          }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      console.log("> ERC1155 Storage Check <");

      let _tokenId: string | number = parseInt(tokenId);
      _tokenId = _tokenId.toLocaleString("fullwide", { useGrouping: false });

      const qty = await _contract.storedNfts(_tokenId);
      console.log(`qty for #`, _tokenId);

      return new NextResponse(JSON.stringify({ quantity: qty.toString() }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    console.log("> ERC721 Storage Check <");

    if (!tier) {
      return new NextResponse(
        JSON.stringify({
          message: "Missing tier",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    let _tier: string | number = parseInt(tier);
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
