import { ReactNode } from "react";

export type ModalContextProps = {
  isModalOpen: boolean;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  modalContent: ReactNode;
};
