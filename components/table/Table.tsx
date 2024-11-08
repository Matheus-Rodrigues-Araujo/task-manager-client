"use client";

import { useState } from "react";

import TableRow from "./TableRow";
import { handleDragOver, restartHover } from "@/components/table/tableUtils";
import { updateOrder } from "@/services/task-service";
import { TaskProps } from "@/types";
import { useTasks } from "@/contexts/TaskContext";
import { useTheme } from "@/contexts/ThemeContext";

export default function Table() {
  const { tasks, setTasks } = useTasks();
  const { theme } = useTheme();

  const [draggedRowItem, setDraggedRowItem] = useState<number | null>(null);
  const [hoveredRowItem, setHoveredRowItem] = useState<number | null>(null);

  const handleDrop = async (hoveredIndex: number) => {
    if (draggedRowItem === null) return;

    const updatedTasks = [...tasks];
    const [removed] = updatedTasks.splice(draggedRowItem, 1);
    updatedTasks.splice(hoveredIndex, 0, removed);

    const tasksWithUpdatedOrder = updatedTasks
      .map((task, index) => ({
        ...task,
        order: index + 1,
      }))
      .sort((a, b) => a.order - b.order);

    try {
      await updateOrder(tasksWithUpdatedOrder);
      setTasks(updatedTasks);
    } catch (error) {
      alert(error);
    }

    setDraggedRowItem(null);
    setHoveredRowItem(null);
  };

  return (
    <>
      <div className="bg-blue p-3 rounded-t-md">
        <h1 className="text-white text-3xl">Tarefas</h1>
      </div>
      <div className="overflow-x-scroll">
      <table className="w-full table-auto">
  <thead className="font-semibold text-xl">
    <tr className={`${
      theme === "dark" ? "outline-1 outline outline-white text-white" : "border-[0.5px] border-gray border-y-[0.5px]"
    }`}>
      <th className="px-2 py-1">#ID</th>
      <th className="px-2 py-1 ">NOME</th>
      <th className="px-2 py-1">PREÇO</th>
      <th className="px-2 py-1 ">PRAZO</th>
      <th className="px-2 py-1">AÇÕES</th>
    </tr>
  </thead>
  <tbody>
    {tasks && tasks.sort((a, b) => a.order - b.order).map((row: TaskProps, index) => (
      <TableRow
        key={index}
        row={row}
        index={index}
        onDragStart={() => setDraggedRowItem(index)}
        onDragOver={(e) => handleDragOver(e, setHoveredRowItem, index)}
        onDrop={() => handleDrop(index)}
        onDragEnd={() => restartHover(setHoveredRowItem)}
        isDragged={index === draggedRowItem}
        isHovered={index === hoveredRowItem}
      />
    ))}
  </tbody>
</table>
      </div>
    </>
  );
}
