import sqlite3 from 'sqlite3';
import logger from '../config/logger';

export const connectDB = () => {
  const db = new sqlite3.Database('./src/config/tasks.db', (err) => {
    if (err) {
      logger.error(`Erro ao conectar ao banco de dados: ${err.message}`);
    } else {
      logger.info('Conexão com o banco de dados SQLite estabelecida.');
    }
  });
  return db;
};

export const initializeDatabase = () => {
  const db = connectDB();
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY, 
        name TEXT NOT NULL CHECK(length(name) <= 128),
        description TEXT CHECK(length(description) <= 255),
        status TEXT CHECK(status IN ('pending', 'in_progress', 'done')) NOT NULL DEFAULT 'pendente'
        )`,
      (err) => {
        if (err) {
          logger.error(`Erro ao criar a tabela de tarefas: ${err.message}`);
        } else {
          logger.info('Tabela de tarefas inicializada.');
        }
      },
    );
  });

  db.close((err) => {
    if (err) {
      logger.error(`Erro ao fechar o banco de dados: ${err.message}`);
    } else {
      logger.info('Conexão com o banco de dados SQLite fechada.');
    }
  });
};
