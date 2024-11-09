import express from 'express';
import '../docs/tasks.docs';

import {
  createTaskController,
  getTasksController,
  getTaskController,
  updateTaskController,
  partialTaskController,
  deleteTaskController,
} from '../controller/tasks.controller';

import {
  taskIdSchema,
  taskPatchSchema,
  taskSchema,
} from '../schemas/task.schema';
import {
  validateRequestBody,
  validateRequestParams,
} from '../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/tarefas/add',
  validateRequestBody(taskSchema),
  createTaskController,
);
router.get('/tarefas', getTasksController);
router.get(
  '/tarefas/:id',
  validateRequestParams(taskIdSchema),
  getTaskController,
);
router.put(
  '/tarefas/:id',
  validateRequestParams(taskIdSchema),
  validateRequestBody(taskSchema),
  updateTaskController,
);
router.delete(
  '/tarefas/:id',
  validateRequestParams(taskIdSchema),
  deleteTaskController,
);
router.patch(
  '/tarefas/:id',
  validateRequestBody(taskPatchSchema),
  partialTaskController,
);

export default router;
