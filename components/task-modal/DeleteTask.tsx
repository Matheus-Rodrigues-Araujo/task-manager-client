"use client";
import { useModal } from "@/contexts/ModalContext";
import { useTasks } from "@/contexts/TaskContext";
import { useTheme } from "@/contexts/ThemeContext";
import { deleteTask } from "@/services/task-service";
import { IoMdAlert } from "react-icons/io";

export default function DeleteTask({ id }: { id: number }) {
  const { closeModal } = useModal();
  const { setTasks } = useTasks();
  const { theme } = useTheme();

  const handleDeleteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      closeModal();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form
      onSubmit={handleDeleteSubmit}
      className={`${theme === "dark" ? "bg-dark" : "bg-white"} modal`}
    >
      <h2 className="text-2xl text-blue font-bold">Deletar Tarefa</h2>
      <div className="flex gap-2">
      <IoMdAlert size="2rem" color="#F96D4B" />
      <p className={`${theme === "dark" ? "text-white" : "text-dark"} modal text-lg font-normal p-0`}>
        Deseja prosseguir com ação?
      </p>
      </div>
      <div className="flex w-full justify-end items-center gap-2">
        <button
          onClick={closeModal}
          className="bg-red p-2 text-white uppercase font-bold rounded-md hover:bg-dark-red"
        >
          Não
        </button>
        <button
          type="submit"
          className="bg-light-blue p-2 text-white uppercase font-bold rounded-md hover:bg-blue"
        >
          Sim
        </button>
      </div>
    </form>
  );
}
