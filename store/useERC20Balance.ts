import { create } from "zustand";

interface ERC20Balance {
  ERC20Balance: number;
  setERC20Balance: (balance: number) => void;
}

export const useERC20Balance = create<ERC20Balance>((set) => ({
  ERC20Balance: 0,
  setERC20Balance: (balance: number) => set({ ERC20Balance: balance }),
}));
