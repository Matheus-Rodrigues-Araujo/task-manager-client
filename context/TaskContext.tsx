"use client";

import {
  useState,
  createContext,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { TaskProps } from "@/types";
import { findAll, handleError } from "@/services/task-service";
import { AxiosError } from "axios";

type TaskContextProps = {
  tasks: TaskProps[];
  setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>;
};

export const TaskContext = createContext<TaskContextProps | undefined>(
  undefined
);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    refreshTasks();
  }, [tasks]);

  const refreshTasks = async () => {
    try {
      const result = await findAll();
      setTasks(result);
    } catch (error) {
      setMessage(error as string);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks}}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used with TasksProvider!!!");
  return context;
};
