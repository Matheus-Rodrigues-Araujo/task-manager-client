// import { TaskProps } from "@/types";
import { Dispatch, SetStateAction } from "react";

type SetState<T> = Dispatch<SetStateAction<T | null>>;


export const handleDragOver = (e: React.DragEvent,setHoveredRowItem: SetState<number>, index: number
) => {
  e.preventDefault();
  requestAnimationFrame(() => setHoveredRowItem(index));
};

export const restartHover = (setHoveredRowItem: SetState<number>) => {
  setHoveredRowItem(null);
}