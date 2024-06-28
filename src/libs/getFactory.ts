export const getFactory = (chainId: number) => {
  // Ethereum
  if (chainId === 1) {
    return "";
  }

  // Polygon
  if (chainId == 137) {
    return "0x1eEb916393475d501e25343A9B6f05E913cDA7d1";
  }

  // Blast
  if (chainId == 81457) {
    return "0x2A567aDA8bAa8C845ae6991ba16C9c8c18aE4314";
  }

  // Base
  if (chainId === 8453) {
    return "0x71E1102793F399d517d23C1C29030229c9B18b34";
  }

  // Optimism
  if (chainId === 10) {
    return "0xE7325F9182AbAF2B821082e8332cDa055EEE70e1";
  }

  // Arbitrum
  if (chainId === 42161) {
    return "0xE7325F9182AbAF2B821082e8332cDa055EEE70e1";
  }
};