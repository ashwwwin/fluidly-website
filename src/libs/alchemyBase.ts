import { ethers, JsonRpcProvider } from "ethers";

export const getAlchemyBase = async (network: string) => {
  let base;
  let key;

  if (network == "Base") {
    base = `https://base-mainnet.g.alchemy.com`;
    key = process.env.ALCHEMY_KEY_BASE;
  }

  if (network == "Ethereum") {
    base = `https://eth-mainnet.g.alchemy.com`;
    key = process.env.ALCHEMY_KEY;
  }

  if (network == "Arbitrum") {
    base = `https://arbitrum-mainnet.g.alchemy.com`;
  }

  if (network == "Polygon") {
    base = `https://polygon-mainnet.g.alchemy.com`;
    key = process.env.ALCHEMY_KEY_POLY;
  }

  if (network == "Blast") {
    base = `https://blast-mainnet.g.alchemy.com`;
    key = process.env.ALCHEMY_KEY_BLAST;
  }

  return { url: base, key: key };
};
