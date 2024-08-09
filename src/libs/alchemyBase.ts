import { ethers, JsonRpcProvider } from "ethers";

export const getAlchemyBase = async (network: string) => {
  let base;
  let key = process.env.ALCHEMY_KEY;

  if (network == "Base") {
    base = `https://base-mainnet.g.alchemy.com`;
  }

  if (network == "Ethereum") {
    base = `https://eth-mainnet.g.alchemy.com`;
  }

  if (network == "Arbitrum") {
    base = `https://arb-mainnet.g.alchemy.com`;
  }

  if (network == "Optimism") {
    base = `https://opt-mainnet.g.alchemy.com`;
  }

  if (network == "Polygon") {
    base = `https://polygon-mainnet.g.alchemy.com`;
  }

  if (network == "Blast") {
    base = `https://blast-mainnet.g.alchemy.com`;
  }

  return { url: base, key: key };
};
