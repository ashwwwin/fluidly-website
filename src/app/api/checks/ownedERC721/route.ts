import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../libs/database";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const wallet = url.searchParams.get("wallet");
  const contract = url.searchParams.get("contract");

  try {
    const db = await connectToDatabase();
    const collection = db.collection("liquidNfts");

    console.log(contract);
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

    const alchemyKey = process.env.ALCHEMY_KEY;
    const alchemyUrl = `https://eth-mainnet.g.alchemy.com/nft/v2/${alchemyKey}/getNFTs?owner=${wallet}&contractAddresses[]=${contract}&withMetadata=false&pageSize=100`;

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
