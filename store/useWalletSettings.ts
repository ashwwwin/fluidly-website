import { create } from "zustand";

interface WalletSettings {
  walletAddress: string;
  setWalletAddress: (address: string) => void;
  chainId: number;
  setChainId: (chainId: number) => void;
  explorer: string;
  setExplorer: (explorer: string) => void;
}

export const useWalletSettings = create<WalletSettings>((set) => ({
  walletAddress: "",
  setWalletAddress: (address: string) => set({ walletAddress: address }),
  chainId: 0,
  setChainId: (chainId: number) => set({ chainId: chainId }),
  explorer: "",
  setExplorer: (explorer: string) => set({ explorer: explorer }),
}));
