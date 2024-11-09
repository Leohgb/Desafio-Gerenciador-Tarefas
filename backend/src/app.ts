import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import taskRoutes from './routes/tasks.routes';
import swaggerjsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

const app = express();
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'TAREFAS API',
      version: '1.0.0',
      description: 'TAREFAS API INFOS',
      contact: {
        name: 'Leonardo Leal',
      },
    },
    servers: [
      {
        url: 'http://localhost:8080/v1',
      },
    ],
  },
  apis: [
    path.join(__dirname, './swagger/swagger.yaml'),
    path.join(__dirname, './routes/tasks.routes.ts'),
  ],
};

app.use(express.json());
app.use(cors());
app.use(logger('dev'));
const swaggerDocs = swaggerjsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/v1', taskRoutes);

export default app;
