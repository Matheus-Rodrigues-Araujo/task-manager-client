"use client";
import { useModal } from "@/context/ModalContext";

import EditTask from "../task-modal/EditTask";
import DeleteTask from "../task-modal/DeleteTask";
import { TableRowProps } from "@/types";
import { MdDelete, MdEditSquare } from "react-icons/md";

export default function TableRow({
  row,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDrop,
  index,
  isDragged,
  isHovered,
}: TableRowProps) {
  const { id, name, price, endDate } = row;
  const { openModal } = useModal();
  const parsedDate =  new Date(endDate);
  const dateFormat = `${String(parsedDate.getDate() +1).padStart(2, '0')}/${String(parsedDate.getMonth() + 1).padStart(2, '0')}/${parsedDate.getFullYear()}`;

  return (
    <>
      <tr
        draggable
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragEnd={onDragEnd}
        key={index}
        id={index.toString()}
        className={`cursor-move ${isDragged ? "bg-light-blue" : ""} ${
          isHovered ? "bg-green-300" : ""
        } ${price >= 1000 && "bg-yellow"}`}
      >
        <td>{id}</td>
        <td>{name}</td>
        <td>R$ {price.toString().replace(".", ",")}</td>
        <td>{dateFormat}</td>
        <td className="flex justify-center items-center gap-2">
          <button
            onClick={() => openModal(<EditTask data={row}/>)}
            className="w-10 h-10 flex justify-center items-center rounded-md bg-blue hover:bg-light-blue"
          >
            <MdEditSquare size="2rem" color="white" />
          </button>
          <button
            onClick={() => openModal(<DeleteTask id={row.id} />)}
            className="w-10 h-10 flex justify-center items-center rounded-md bg-red hover:bg-dark-red"
          >
            <MdDelete size="2rem" color="white" />
          </button>
        </td>
      </tr>
    </>
  );
}
