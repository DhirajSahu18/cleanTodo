// src/infrastructure/server.ts
import express from 'express';
import cors from 'cors';
import { TodoController } from './controllers/todo-controller';

export class Server {
  private app: express.Application;
  constructor(private todoController: TodoController) {
    this.app = express();
    this.setup();
  }

  private setup() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use('/todos', this.todoController.getRouter());
  }

  start(port: number) {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}