import { NextRequest, NextResponse } from "next/server";
import { ethers, JsonRpcProvider } from "ethers";
import { connectToDatabase } from "../../../../libs/database";
import { getAlchemyBase } from "@/libs/alchemyBase";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const wallet = url.searchParams.get("wallet");
  const contract = url.searchParams.get("contract");
  const network = url.searchParams.get("network");
  const metadata = url.searchParams.get("metadata");

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

    let tokens = [];
    if (network == "Blast") {
      const generationResponse = await fetch(
        `https://api.simplehash.com/api/v0/nfts/owners?chains=blast&wallet_addresses=${wallet}&contract_addresses=${contract}&limit=50`,
        {
          method: "GET",
          headers: new Headers({
            "X-API-KEY": process.env.SIMPLEHASH_KEY || "",
            accept: "application/json",
          }),
        }
      );
      if (!generationResponse.ok) {
        throw new Error(
          `Failed to fetch NFT owners data: ${generationResponse.statusText}`
        );
      }

      const generationData = await generationResponse.json();

      for (let nft of generationData.nfts) {
        if (metadata == "true") {
          tokens.push({
            tokenId: nft.token_id,
            image: nft.extra_metadata.image_original_url.startsWith("ipfs://")
              ? `https://ipfs.io/ipfs/${nft.extra_metadata.image_original_url.replace(
                  "ipfs://",
                  ""
                )}`
              : nft.extra_metadata.image_original_url,
          });
          console.log(nft.extra_metadata);
        } else {
          tokens.push(nft.token_id);
        }
      }
      console.log(tokens);
    } else {
      let alchemyBase = await getAlchemyBase(network);

      let alchemyUrl = `${alchemyBase.url}/nft/v2/${alchemyBase.key}/getNFTs?owner=${wallet}&contractAddresses[]=${contract}&withMetadata=false&pageSize=100`;

      if (metadata == "true") {
        alchemyUrl = `${alchemyBase.url}/nft/v2/${alchemyBase.key}/getNFTs?owner=${wallet}&contractAddresses[]=${contract}&withMetadata=true&pageSize=100`;
      }

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

      for (let item of nftData.ownedNfts) {
        let tokenId = parseInt(item.id.tokenId, 16); // Assuming tokenId is in hex and needs to be converted to an integer

        console.log(item);
        if (metadata == "true") {
          tokens.push({ tokenId: tokenId, image: item.media[0].gateway });
        } else {
          tokens.push(tokenId);
        }
      }
    }
    return new NextResponse(JSON.stringify({ tokens }), {
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
