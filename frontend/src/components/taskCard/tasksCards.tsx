import React from "react";
import './taskCard.css';
import { ProgressStatus, TodoListInterface } from "../../interfaces/Task";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";


interface TasksCardsProps {
  id: string;
  name: string;
  description: string;
  status: ProgressStatus;
  onDelete: (id: string) => void;
  onPut: (task: TodoListInterface) => void;
  handleTaskClick: (id: string) => void;
}

function TasksCards({ id, name, description, status, onDelete, onPut, handleTaskClick }: TasksCardsProps) {

  return (
    <li value={id}>
      <h4 onClick={()=>handleTaskClick(id)}>{name}</h4>
      <div>
        <button onClick={() => onDelete(id)}><FaTrash /></button>
        <button onClick={() => onPut({ id, name, description, status })}><FaEdit /></button>
      </div >
    </li >
  );
}

export default TasksCards;