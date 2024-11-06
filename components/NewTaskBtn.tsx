"use client";

import CreateTask from "./task-modal/CreateTask";
import { useModal } from "@/context/ModalContext";
import { FaPlus } from "react-icons/fa6";

export default function NewTaskBtn() {
  const { openModal } = useModal();

  return (
    <button
      onClick={() => openModal(<CreateTask />)}
      className="fixed bottom-10 right-0 h-9 w-9 flex items-center justify-center bg-blue rounded-full"
    >
      <FaPlus color="white" size="2rem" />
    </button>
  );
}
