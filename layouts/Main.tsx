"use client";

import Table from "../components/table/Table";
import TaskModal from "../components/task-modal/TaskModal";
import { NewTaskBtn } from "@/components";
import { TasksProvider } from "@/context/TaskContext";
import { ModalProvider } from "@/context/ModalContext";

export default function Main() {
  return (
    <TasksProvider>
      <ModalProvider>
        <main className="min-h-screen p-6">
          <div className="max-w-[1400px] mx-auto mb-10">
            <Table />
            <NewTaskBtn />
            <TaskModal />
          </div>
        </main>
      </ModalProvider>
    </TasksProvider>
  );
}
