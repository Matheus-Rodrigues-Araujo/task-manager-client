import { TaskProps } from "./Task";

export type TableRowProps = {
  row: TaskProps;
  index: number;
  onDragStart: () => void;
  onDragOver: (event: React.DragEvent<HTMLTableRowElement>) => void;
  onDragEnd: () => void;
  onDrop: () => void;
  isDragged: boolean;
  isHovered: boolean;
};