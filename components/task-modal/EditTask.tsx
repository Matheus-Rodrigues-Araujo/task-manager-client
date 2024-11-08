"use client";

import { useReducer } from "react";
import { useModal } from "@/contexts/ModalContext";
import { updateTask } from "@/services/task-service";
import { TaskProps } from "@/types";
import { useTheme } from "@/contexts/ThemeContext";

type EditTaskProps = {
  data: TaskProps;
};

const initialState = {
  name: "",
  price: 0,
  endDate: null as Date | null,
};

type Action =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_PRICE"; payload: number }
  | { type: "SET_END_DATE"; payload: Date | null }
  | { type: "RESET" };

function reducer(state: typeof initialState, action: Action) {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_PRICE":
      return { ...state, price: action.payload };
    case "SET_END_DATE":
      return { ...state, endDate: action.payload };
    default:
      return state;
  }
}

export default function EditTask({ data }: EditTaskProps) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    name: data.name,
    price: data.price,
    endDate: new Date(data.endDate),
  });

  const { closeModal } = useModal();
  const { theme } = useTheme();

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const task: TaskProps = {
      id: data.id,
      name: state.name,
      price: state.price,
      endDate: state.endDate || new Date(),
      order: data.order,
    };
    try {
      await updateTask(task);
      closeModal();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form
      onSubmit={handleEditSubmit}
      className={`${theme === "dark" ? 'bg-dark' : 'bg-white'} modal`}
    >
      <h2 className="text-2xl text-blue font-bold">Editar tarefa</h2>
      <label className={`grid gap-2 ${theme === "dark" ? "text-white" : "text-dark"}`} htmlFor="name">
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
      <label className={`grid gap-2 ${theme === "dark" ? "text-white" : "text-dark"}`} htmlFor="price">
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
      <label className={`grid gap-2 ${theme === "dark" ? "text-white" : "text-dark"}`} htmlFor="deadline">
        Data Limite
        <input
          type="date"
          name="deadline"
          id="deadline"
          value={
            state.endDate instanceof Date
              ? state.endDate.toISOString().split("T")[0]
              : ""
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
  );
}
