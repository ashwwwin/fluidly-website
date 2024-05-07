import { ethers, JsonRpcProvider } from "ethers";

export const getAlchemyBase = async (network: string) => {
  let base;

  if (network == "Base") {
    base = `https://base-mainnet.g.alchemy.com`;
  }

  if (network == "Ethereum") {
    base = `https://eth-mainnet.g.alchemy.com`;
  }

  return base;
};
