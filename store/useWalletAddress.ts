import { create } from "zustand";

interface WalletAddress {
  walletAddress: string;
  setWalletAddress: (address: string) => void;
}

export const useWalletAddress = create<WalletAddress>((set) => ({
  walletAddress: "",
  setWalletAddress: (address: string) => set({ walletAddress: address }),
}));
