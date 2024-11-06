"use client";
import { useModal } from "@/context/ModalContext";
import { useTasks } from "@/context/TaskContext";
import { deleteTask } from "@/services/task-service";

export default function DeleteTask({ id }: { id: number }) {
  const { closeModal } = useModal();
  const { setTasks } = useTasks()

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
      className="bg-white w-full h-3/6 max-w-xl z-50 p-5 rounded-md flex flex-col gap-2"
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
