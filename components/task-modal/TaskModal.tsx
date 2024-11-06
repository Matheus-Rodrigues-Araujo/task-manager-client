import { useModal } from "@/context/ModalContext";

export default function TaskModal() {
  const { isModalOpen, modalContent } = useModal();
  if (!isModalOpen) return null;

  return (
    <div className="fixed top-0 left-0 bg-[#0b0a0a46] min-h-screen w-full flex justify-center items-center">
      {modalContent}
    </div>
  );
}
