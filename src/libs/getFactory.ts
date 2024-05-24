export const getFactory = (chainId: number) => {
    // Ethereum
    if (chainId === 1) {
      return "";
    }

    // Base
    if (chainId === 8453) {
      return "0x71E1102793F399d517d23C1C29030229c9B18b34";
    }
}