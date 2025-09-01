import { create } from 'zustand';

interface CurrencyState {
  balance: number;
  increaseBalance: (amount: number) => void;
}

export const useCurrency = create<CurrencyState>((set) => ({
  balance: 0,
  increaseBalance: (amount) => set((state) => ({ balance: state.balance + amount })),
}));
