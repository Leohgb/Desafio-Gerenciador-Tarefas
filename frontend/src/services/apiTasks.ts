import { ProgressStatus, TodoListInterface } from "../interfaces/Task";

export const addTask = async (newTask: TodoListInterface) => {
  const response = await fetch("http://localhost:8080/v1/tarefas/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask),
  });
  return response;
};

export const updateTask = async (id: string, updatedTask: TodoListInterface) => {
  const response = await fetch(`http://localhost:8080/v1/tarefas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTask),
  });
  return response;
};

export const patchTaskField = async (id: string, field: string, value: string) => {
  const response = await fetch(`http://localhost:8080/v1/tarefas/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ [field]: value }),
  });
  return response;
};

export const deleteTask = async (id: string) => {
  const response = await fetch(`http://localhost:8080/v1/tarefas/${id}`, {
    method: "DELETE",
  });
  return response;
};

export const fetchTasks = async (filter: ProgressStatus | "all") => {
  const url = filter === "all" ? "http://localhost:8080/v1/tarefas" : `http://localhost:8080/v1/tarefas?status=${filter}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.tasks;
};

export const fetchTask = async (id: string) => {
  const response = await fetch(`http://localhost:8080/v1/tarefas/${id}`);
  const data = await response.json();
  return data.data;
};
