export const getFactory = (chainId: number) => {
    // Ethereum
    if (chainId === 1) {
      return "0x05dD8dcC71FD01E6f1E486E8997e369a57E11218";
    }

    // Base
    if (chainId === 8453) {
      return "0xB15c80eF7777d4Ded778d8b7b431AdfeE71752cd";
    }
}