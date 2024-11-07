"use client";

import CreateTask from "./task-modal/CreateTask";
import { useModal } from "@/contexts/ModalContext";
import { FaPlus } from "react-icons/fa6";

export default function NewTaskBtn() {
  const { openModal } = useModal();

  return (
    <button
      onClick={() => openModal(<CreateTask />)}
      className="fixed bottom-10 right-10 h-10 w-10 flex items-center justify-center rounded-full bg-blue"
    >
      <FaPlus color="white" size="2rem" />
    </button>
  );
}
