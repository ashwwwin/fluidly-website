import { NextRequest, NextResponse } from "next/server";
import { ethers, JsonRpcProvider } from "ethers";
import { connectToDatabase } from "../../../../libs/database";
import { getAlchemyBase } from "@/libs/alchemyBase";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const wallet = url.searchParams.get("wallet");
  const contract = url.searchParams.get("contract");
  const network = url.searchParams.get("network");

  try {
    const db = await connectToDatabase();
    const collection = db.collection("liquidNfts");

    console.log(contract);

    if (!wallet || !contract || !network) {
      return;
    }
    
    // let isExists = await collection.findOne({
    //   nftAddress: contract,
    // });

    // console.log("isExists", isExists);

    // if (!isExists) {
    //   return new NextResponse(
    //     JSON.stringify({ message: "Contract not found in Liquidified NFTs" }),
    //     {
    //       status: 500,
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    // }

    let alchemyBase = await getAlchemyBase(network);

    let alchemyUrl = `${alchemyBase.url}/nft/v2/${alchemyBase.key}/getNFTs?owner=${wallet}&contractAddresses[]=${contract}&withMetadata=false&pageSize=100`;

    const alchemyResponse = await fetch(alchemyUrl, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });

    if (!alchemyResponse.ok) {
      throw new Error(
        `Failed to fetch NFT data from Alchemy: ${alchemyResponse.statusText}`
      );
    }

    const nftData = await alchemyResponse.json();

    let tokenIds = [];
    for (let item of nftData.ownedNfts) {
      let tokenId = parseInt(item.id.tokenId, 16); // Assuming tokenId is in hex and needs to be converted to an integer
      tokenIds.push(tokenId);
    }

    return new NextResponse(JSON.stringify({ tokenIds }), {
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
