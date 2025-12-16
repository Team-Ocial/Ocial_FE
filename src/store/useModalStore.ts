import { create } from 'zustand';

export interface ModalData {
  type: 'confirm' | 'warning';
  title: string;
  desc: string;
  actionButton: string;
  onAction: () => void;
}

interface ModalState {
  isOpen: boolean;
  modalData: ModalData | null;
  openModal: (data: ModalData) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  modalData: null,
  openModal: (data) =>
    set({
      isOpen: true,
      modalData: data,
    }),
  closeModal: () =>
    set({
      isOpen: false,
      modalData: null,
    }),
}));
