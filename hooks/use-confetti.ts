import { create } from "zustand";

type ConfettiState = {
  isOpen: boolean;
  OnOpen: () => void;
  onClose: () => void;
};

export const useConfetti = create<ConfettiState>((set) => ({
  isOpen: false,
  OnOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
