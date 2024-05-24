import { NextRequest, NextResponse } from "next/server";
import { ethers, JsonRpcProvider } from "ethers";
import { connectToDatabase } from "../../../../libs/database";
import { getAlchemyBase } from "@/libs/alchemyBase";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const contract = url.searchParams.get("contract");
    const network = url.searchParams.get("network");

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

    const db = await connectToDatabase();
    const collection = db.collection("liquidNfts");

    const liquidifyContract = await collection.findOne({
      liquidifyContract: { $regex: new RegExp(`^${contract}$`, "i") },
    });

    if (!liquidifyContract) {
      return new NextResponse(
        JSON.stringify({
          message: "Contract not found",
        }),
        {
          status: 500,
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
        "function getTiersCount() external view returns (uint256)",
        "function tiersList(uint256 index) external view returns (uint256)",
        "function tokensPerNft(uint256 index) external view returns (uint256)",
      ],
      provider
    );

    const tiersCount = await _contract.getTiersCount();

    let tiers = [];
    for (let i = 0; i < tiersCount; i++) {
      const tier = await _contract.tiersList(i);
      tiers.push(parseInt(await tier.toString()));
    }

    tiers.sort((a, b) => a - b);
    tiers = await Promise.all(
      tiers.map(async (tier, index) => ({
        tokenId: tier,
        name: `Tier ${index + 1}`,
        amount: Math.ceil(
          parseInt(await _contract.tokensPerNft(tier)) / 10 ** 18
        ),
      }))
    );

    let existingTiers = liquidifyContract && liquidifyContract.tiers;
    let updatedTiers = existingTiers
      ? tiers.filter(
          (tier) =>
            !existingTiers.some(
              (existingTier: any) => existingTier.tokenId === tier.tokenId
            )
        )
      : tiers;

    updatedTiers = existingTiers ? [...existingTiers, ...updatedTiers] : updatedTiers;

    await collection.updateOne(
      { liquidifyContract: { $regex: new RegExp(`^${contract}$`, "i") } },
      { $set: { tiers: updatedTiers } }
    );

    console.log(tiers);

    return new NextResponse(JSON.stringify({ tiers: tiers }), {
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
