import { create } from "zustand";

type ModalState = {
  isOpen: boolean;
  modalContent: React.ReactNode | null;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  modalContent: null,
  openModal: (content) => set({ isOpen: true, modalContent: content }),
  closeModal: () => set({ isOpen: false, modalContent: null }),
}));
