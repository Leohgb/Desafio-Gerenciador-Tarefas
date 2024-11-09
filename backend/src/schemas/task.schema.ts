import { z } from 'zod';
import { Status } from '../interfaces/Task';

export const taskSchema = z.object({
  id: z.string().uuid().optional(),
  name: z
    .string()
    .min(1, 'O nome é obrigatório.')
    .max(128, 'O nome deve ter no máximo 128 caracteres.'),
  description: z
    .string()
    .max(255, 'A descrição deve ter no máximo 255 caracteres.'),
  status: z.nativeEnum(Status),
});

export const taskIdSchema = z.object({
  id: z.string().uuid(),
});

export const taskPatchSchema = z.object({
  title: z.string().optional(),
  description: z
    .string()
    .max(255, 'A descrição deve ter no máximo 255 caracteres.')
    .optional(),
  status: z.nativeEnum(Status).optional(),
});
