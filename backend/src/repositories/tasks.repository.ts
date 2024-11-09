import { connectDB } from '../config/database';
import { Status, Task } from '../interfaces/Task';
import logger from '../config/logger';

export const createTaskRepo = (task: Task): Promise<Task> => {
  return new Promise((resolve, reject) => {
    const db = connectDB();

    const query = `INSERT INTO tasks (id, name, description, status) VALUES (?, ?, ?, ?)`;

    db.run(
      query,
      [task.id, task.name, task.description, task.status],
      function (err) {
        if (err) {
          logger.error('Erro ao adicionar a tarefa:', err.message);
          reject(err);
        } else {
          logger.info('Tarefa adicionada com sucesso, ID:', task.id);
          resolve(task);
        }
      },
    );

    db.close((err) => {
      if (err) {
        logger.error(
          'Erro ao fechar o banco de dados após criação de tarefa:',
          err.message,
        );
      }
    });
  });
};

export const getTasksRepo = (): Promise<Task[]> => {
  return new Promise((resolve, reject) => {
    const db = connectDB();

    const query = `SELECT * FROM tasks;`;

    db.all(query, [], (err, rows: Task[]) => {
      if (err) {
        logger.error('Erro ao buscar as tarefas:', err.message);
        reject(err);
      } else {
        logger.info('Tarefas recuperadas com sucesso:', rows);
        resolve(rows);
      }
    });

    db.close((err) => {
      if (err) {
        logger.error(
          'Erro ao fechar o banco de dados após busca de tarefas:',
          err.message,
        );
      }
    });
  });
};

export const getTasksByStatusRepo = (status: Status): Promise<Task[]> => {
  return new Promise((resolve, reject) => {
    const db = connectDB();

    const query = `SELECT * FROM tasks WHERE status = ?;`;

    db.all(query, [status], (err, rows: Task[]) => {
      if (err) {
        logger.error('Erro ao buscar as tarefas por status:', err.message);
        reject(err);
      } else {
        logger.info('Tarefas por status recuperadas com sucesso:', rows);
        resolve(rows);
      }
    });

    db.close((err) => {
      if (err) {
        logger.error(
          'Erro ao fechar o banco de dados após busca de tarefas por status:',
          err.message,
        );
      }
    });
  });
};

export const getTaskRepo = (id: string): Promise<Task | null> => {
  return new Promise((resolve, reject) => {
    const db = connectDB();

    const query = `SELECT * FROM tasks WHERE id = ?;`;

    db.get(query, [id], (err, row: Task) => {
      if (err) {
        logger.error('Erro ao buscar a tarefa:', err.message);
        reject(err);
      } else {
        if (!row) {
          resolve(null);
        } else {
          logger.info('Tarefa encontrada:', row);
          resolve(row);
        }
      }
    });

    db.close((err) => {
      if (err) {
        logger.error(
          'Erro ao fechar o banco de dados após busca de tarefa:',
          err.message,
        );
      }
    });
  });
};

export const updateTaskRepo = (
  id: string,
  updatedTask: Task,
): Promise<Task | null> => {
  return new Promise((resolve, reject) => {
    const db = connectDB();

    const query = `UPDATE tasks SET name = ?, description = ?, status = ? WHERE id = ?;`;

    db.run(
      query,
      [updatedTask.name, updatedTask.description, updatedTask.status, id],
      function (err) {
        if (err) {
          logger.error('Erro ao atualizar a tarefa:', err.message);
          reject(err);
        } else {
          if (this.changes === 0) {
            resolve(null);
          } else {
            db.get(
              `SELECT * FROM tasks WHERE id = ?`,
              [id],
              (err, row: Task) => {
                if (err) {
                  logger.error(
                    'Erro ao buscar a tarefa atualizada:',
                    err.message,
                  );
                  reject(err);
                } else {
                  logger.info('Tarefa atualizada:', row);
                  resolve(row);
                }
              },
            );
          }
        }
      },
    );

    db.close((err) => {
      if (err) {
        logger.error('Erro ao fechar o banco de dados:', err.message);
      }
    });
  });
};

export const deleteTaskRepo = (id: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const db = connectDB();

    const query = `DELETE FROM tasks WHERE id = ?;`;

    db.run(query, [id], function (err) {
      if (err) {
        logger.error('Erro ao deletar a tarefa:', err.message);
        reject(err);
      } else {
        if (this.changes == 0) {
          resolve(false);
        } else {
          logger.info(`Tarefa com ID ${id} deletada com sucesso.`);
          resolve(true);
        }
      }
    });

    db.close((err) => {
      if (err) {
        logger.error('Erro ao fechar o banco de dados:', err.message);
      }
    });
  });
};

export const partialUpdateTaskRepo = (
  id: string,
  partialTask: Partial<Task>,
): Promise<Task | null> => {
  return new Promise((resolve, reject) => {
    const db = connectDB();

    const fields: string[] = [];
    const values: (string | number)[] = [];

    if (partialTask.name) {
      fields.push('name = ?');
      values.push(partialTask.name);
    }
    if (partialTask.description) {
      fields.push('description = ?');
      values.push(partialTask.description);
    }
    if (partialTask.status) {
      fields.push('status = ?');
      values.push(partialTask.status);
    }

    values.push(id);

    const query = `UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`;

    db.run(query, values, function (err) {
      if (err) {
        logger.error('Erro ao atualizar a tarefa parcialmente:', err.message);
        reject(err);
      } else if (this.changes === 0) {
        resolve(null);
      } else {
        logger.info(`Tarefa com ID ${id} atualizada parcialmente.`);
        resolve({ id, ...partialTask } as Task);
      }
    });

    db.close((err) => {
      if (err) {
        logger.error('Erro ao fechar o banco de dados:', err.message);
      }
    });
  });
};
