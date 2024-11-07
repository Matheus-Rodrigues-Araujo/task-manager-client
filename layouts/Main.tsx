"use client";

import Table from "../components/table/Table";
import TaskModal from "../components/task-modal/TaskModal";
import { NewTaskBtn } from "@/components";
import Header from "./Header";
import { TasksProvider } from "@/contexts/TaskContext";
import { ModalProvider } from "@/contexts/ModalContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function Main() {
  return (
    <ThemeProvider>
      <TasksProvider>
        <ModalProvider>
          <Header/>
          <main className="w-full relative">
            <Table />
            <NewTaskBtn />
            <TaskModal />
          </main>
        </ModalProvider>
      </TasksProvider>
    </ThemeProvider>
  );
}
