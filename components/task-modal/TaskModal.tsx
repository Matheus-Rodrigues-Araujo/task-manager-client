import { useModal } from "@/contexts/ModalContext";

export default function TaskModal() {
  const { isModalOpen, modalContent } = useModal();
  if (!isModalOpen) return null;

  return (
    <div className="fixed top-0 left-0 bg-[#11111191] min-h-screen w-full flex justify-center items-center">
      {modalContent}
    </div>
  );
}
