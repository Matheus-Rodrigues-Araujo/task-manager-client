"use client";
import { useModal } from "@/contexts/ModalContext";
import { useTasks } from "@/contexts/TaskContext";
import { useTheme } from "@/contexts/ThemeContext";
import { deleteTask } from "@/services/task-service";

export default function DeleteTask({ id }: { id: number }) {
  const { closeModal } = useModal();
  const { setTasks } = useTasks()
  const { isDarkMode } = useTheme();

  const handleDeleteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      closeModal();
    } catch (error) {
      alert(error)
    }
  };

  return (
    <form
      onSubmit={handleDeleteSubmit}
      className={`${isDarkMode ? 'bg-dark' : 'bg-white'} modal`}
      >
      <h2 className="text-2xl text-blue font-bold">Deletar Tarefa</h2>
      <p className="text-lg font-normal">Deseja deletar a tarefa?</p>
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
