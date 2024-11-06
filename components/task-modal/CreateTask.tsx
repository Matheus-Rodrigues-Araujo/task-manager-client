"use client";

import { useReducer, useState } from "react";
import { useModal } from "@/context/ModalContext";
import { useTasks } from "@/context/TaskContext";
import { createTask, handleError } from "@/services/task-service";
import { AxiosError } from "axios";

type TaskState = {
  name: string;
  price: number;
  endDate: Date;
};

type Action =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_PRICE"; payload: number }
  | { type: "SET_END_DATE"; payload: Date }
  | { type: "RESET" };

const initialState: TaskState = {
  name: "",
  price: 0,
  endDate: new Date(),
};

function reducer(state: TaskState, action: Action): TaskState {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_PRICE":
      return { ...state, price: action.payload };
    case "SET_END_DATE":
      return { ...state, endDate: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function CreateTask() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { setTasks } = useTasks();
  const { closeModal } = useModal();

  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!state.endDate || !state.name || !state.price) return;

    const newTask = {
      name: state.name,
      price: state.price,
      endDate: state.endDate,
    };

    try {
      const result = await createTask(newTask);
      setTasks((prev) => [...prev, result]);
      closeModal();
      dispatch({ type: "RESET" });
      alert("Tarefa criada");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleCreateSubmit}
        className="bg-white w-full h-3/6 max-w-xl z-50 p-5 rounded-md flex flex-col gap-2"
      >
        <h2 className="text-2xl text-blue font-bold">Criar Nova Tarefa</h2>
        <label className="grid gap-2" htmlFor="name">
          Nome
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={state.name}
            onChange={(e) =>
              dispatch({ type: "SET_NAME", payload: e.target.value })
            }
          />
        </label>
        <label className="grid gap-2" htmlFor="price">
          Custo
          <input
            type="number"
            name="price"
            id="price"
            placeholder="R$"
            value={state.price}
            onChange={(e) =>
              dispatch({ type: "SET_PRICE", payload: Number(e.target.value) })
            }
          />
        </label>
        <label className="grid gap-2" htmlFor="deadline">
          Data Limite
          <input
            type="date"
            name="deadline"
            id="deadline"
            value={
              state.endDate ? state.endDate.toISOString().split("T")[0] : ""
            }
            onChange={(e) =>
              dispatch({
                type: "SET_END_DATE",
                payload: new Date(e.target.value),
              })
            }
          />
        </label>
        <div className="flex w-full justify-end items-center gap-2">
          <button
            onClick={closeModal}
            className="bg-red p-2 text-white uppercase font-bold rounded-md hover:bg-dark-red"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-light-blue p-2 text-white uppercase font-bold rounded-md hover:bg-blue"
          >
            Confirmar
          </button>
        </div>
      </form>
    </>
  );
}
