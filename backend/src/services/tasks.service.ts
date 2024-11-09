import {
  createTaskRepo,
  getTasksRepo,
  getTaskRepo,
  updateTaskRepo,
  partialUpdateTaskRepo,
  deleteTaskRepo,
  getTasksByStatusRepo,
} from '../repositories/tasks.repository';
import { Status, Task } from '../interfaces/Task';
import logger from '../config/logger';

export const createTask = async (task: Task): Promise<Task> => {
  try {
    const taskRes = await createTaskRepo(task);
    return taskRes;
  } catch (error) {
    logger.error('Erro no serviço ao criar tarefa:', error);
    throw error;
  }
};

export const getTasks = async (): Promise<Task[]> => {
  try {
    const tasks = await getTasksRepo();
    return tasks;
  } catch (error) {
    logger.error('Erro no serviço ao buscar tarefas:', error);
    throw error;
  }
};

export const getTaskByStatus = async (status: Status): Promise<Task[]> => {
  try {
    if (
      status === Status.Pending ||
      status === Status.InProgress ||
      status === Status.Done
    ) {
      const tasks = await getTasksByStatusRepo(status);
      return tasks;
    } else {
      throw new Error('Status inválido');
    }
  } catch (error) {
    logger.error('Erro no serviço ao buscar tarefa por status:', error);
    throw error;
  }
};

export const getTask = async (id: string): Promise<Task | null> => {
  try {
    const task = await getTaskRepo(id);
    return task;
  } catch (error) {
    logger.error('Erro no serviço ao buscar tarefa:', error);
    throw error;
  }
};

export const updateTask = async (
  id: string,
  task: Task,
): Promise<Task | null> => {
  try {
    const taskUpdated = await updateTaskRepo(id, task);
    return taskUpdated;
  } catch (error) {
    logger.error('Erro no serviço ao atualizar tarefa:', error);
    throw error;
  }
};

export const deleteTask = async (id: string): Promise<boolean> => {
  try {
    const taskDeleted = await deleteTaskRepo(id);
    return !!taskDeleted;
  } catch (error) {
    logger.error('Erro no serviço ao deletar tarefa:', error);
    throw error;
  }
};

export const partialUpdateTask = async (
  id: string,
  task: Partial<Task>,
): Promise<Task | null> => {
  try {
    const taskUpdated = await partialUpdateTaskRepo(id, task);
    return taskUpdated;
  } catch (error) {
    logger.error('Erro no serviço ao atualizar parcialmente a tarefa:', error);
    throw error;
  }
};
