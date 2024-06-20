export const getFactory = (chainId: number) => {
  // Ethereum
  if (chainId === 1) {
    return "";
  }

  // Polygon
  if (chainId == 137) {
    return "0x1eEb916393475d501e25343A9B6f05E913cDA7d1";
  }

  // Base
  if (chainId === 8453) {
    return "0x71E1102793F399d517d23C1C29030229c9B18b34";
  }
};