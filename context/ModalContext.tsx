"use client";

import { createContext, ReactNode, useState, useContext } from "react";
import { ModalContextProps } from "@/types/ModelContext";

export const ModalContext = createContext<ModalContextProps | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);

  const openModal = (content: ReactNode) => {
    setIsModalOpen(true);
    setModalContent(content);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        modalContent,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used in the ModalProvider!!!");
  return context;
}
