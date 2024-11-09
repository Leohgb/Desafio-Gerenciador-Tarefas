import { Request, Response } from 'express';
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  partialUpdateTask,
  deleteTask,
  getTaskByStatus,
} from '../services/tasks.service';
import { Status, Task } from '../interfaces/Task';
import { v4 as uuidv4 } from 'uuid';
import logger from '../config/logger';

export const createTaskController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, description, status } = req.body;

    const id = uuidv4();
    const taskData = {
      id,
      name,
      description,
      status,
    };

    if (!taskData.name || !taskData.description || !taskData.status) {
      logger.warn('Tentativa de criação com dados inválidos');
      res.status(400).json({
        message: 'Dados inválidos',
        errors: 'Campos obrigatórios não fornecidos',
      });
      return;
    }

    const task = await createTask(taskData);
    logger.info(`Tarefa criada com sucesso: ${task.id}`);
    res.status(201).json({ message: 'Tarefa criada com sucesso!', task });
  } catch (error: unknown) {
    logger.error('Erro ao criar tarefa', { error });
    res.status(500).json({ message: 'Erro ao criar a tarefa', error });
  }
};

export const getTasksController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const statusParam = req.query.status;
    let tasks;

    if (statusParam) {
      tasks = await getTaskByStatus(statusParam as Status);
      logger.info(`Tarefas com status ${statusParam} buscadas`);
    } else {
      tasks = await getTasks();
      logger.info('Todas as tarefas buscadas');
    }

    res.status(200).json({ message: 'Tarefas buscadas com sucesso!', tasks });
  } catch (error: unknown) {
    logger.error('Erro ao buscar tarefas', { error });
    res.status(500).json({ message: 'Erro ao buscar tarefas', error });
  }
};

export const getTaskController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  try {
    const task = await getTask(id);
    logger.info(`Tarefa ${id} buscada com sucesso`);
    res.status(200).json({ message: 'Tarefa buscada com sucesso!', task });
  } catch (error: unknown) {
    logger.error(`Erro ao buscar tarefa ${id}`, { error });
    res.status(500).json({ message: 'Erro ao buscar tarefa', error });
  }
};

export const updateTaskController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  const taskData = req.body;

  try {
    const updatedTask = await updateTask(id, taskData);
    logger.info(`Tarefa ${id} atualizada com sucesso`);
    res.status(200).json({
      message: 'Tarefa atualizada com sucesso',
      task: updatedTask,
    });
  } catch (error) {
    logger.error(`Erro ao atualizar tarefa ${id}`, { error });
    res.status(500).json({ message: 'Erro ao atualizar tarefa', error });
  }
};

export const deleteTaskController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  try {
    logger.info(`Deletando tarefa ${id}`);
    const task = await deleteTask(id);

    if (!task) {
      logger.warn(`Tarefa com ID ${id} não encontrada`);
      res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    logger.info(`Tarefa ${id} deletada com sucesso`);
    res.status(204).send();
  } catch (error: unknown) {
    logger.error(`Erro ao deletar tarefa ${id}: ${error}`);
    res.status(500).json({ message: 'Erro ao deletar tarefa' });
  }
};

export const partialTaskController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  const updatedTask: Partial<Task> = req.body;
  try {
    const task = await partialUpdateTask(id, updatedTask);
    logger.info(`Tarefa ${id} parcialmente atualizada com sucesso`);
    res.status(200).json({ message: 'Tarefa atualizada com sucesso!', task });
  } catch (error: unknown) {
    logger.error(`Erro ao atualizar tarefa ${id}`, { error });
    res.status(500).json({ message: 'Erro ao atualizar tarefa', error });
  }
};
