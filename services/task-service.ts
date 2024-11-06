import api from "./api";
import { TaskProps } from "@/types";
import { AxiosError } from "axios";

export const handleError = (error: unknown) => {
  if (error instanceof AxiosError && error.response) {
    return error.response.data.message;
  }
};

export const findAll = async (): Promise<TaskProps[]> => {
  try {
    const response = await api.get<TaskProps[]>("/tasks");
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const createTask = async (task: {
  name: string;
  price: number;
  endDate: Date;
}): Promise<TaskProps> => {
  try {
    const response = await api.post("/tasks", task);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const updateTask = async (task: TaskProps): Promise<TaskProps> => {
  try {
    const response = await api.put(`/tasks/${task.id}`, task);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const updateOrder = async (
  tasks: TaskProps[]
): Promise<void | string> => {
  try {
    const response = await api.patch("/tasks/order/", tasks);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const deleteTask = async (id: number): Promise<TaskProps> => {
  try {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};
