// src/infrastructure/controllers/todo-controller.ts
import express from 'express';
import { CreateTodoUseCase } from '../../domain/use-cases/create-todo';
import { GetTodoUseCase } from '../../domain/use-cases/get-todo';
import { GetAllTodosUseCase } from '../../domain/use-cases/get-all-todos';
import { UpdateTodoUseCase } from '../../domain/use-cases/update-todo';
import { DeleteTodoUseCase } from '../../domain/use-cases/delete-todo';

export class TodoController {
  private router: express.Router;
  constructor(
    private createTodoUseCase: CreateTodoUseCase,
    private getTodoUseCase: GetTodoUseCase,
    private getAllTodosUseCase: GetAllTodosUseCase,
    private updateTodoUseCase: UpdateTodoUseCase,
    private deleteTodoUseCase: DeleteTodoUseCase,
  ) {
    this.router = express.Router();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.post('/', async (req, res) => {
      try {
        const todo = await this.createTodoUseCase.execute({ title: req.body.title });
        res.status(201).json(todo);
      } catch (error) {
        res.status(400).json({ error: (error as Error).message });
      }
    });

    this.router.get('/:id', async (req, res) => {
      try {
        const todo = await this.getTodoUseCase.execute(req.params.id);
        if (!todo) {
          return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(todo);
      } catch (error) {
        res.status(400).json({ error: (error as Error).message });
      }
    });

    this.router.get('/', async (req, res) => {
      try {
        const todos = await this.getAllTodosUseCase.execute();
        res.json(todos);
      } catch (error) {
        res.status(400).json({ error: (error as Error).message });
      }
    });

    this.router.put('/:id', async (req, res) => {
      try {
        const todo = await this.updateTodoUseCase.execute({
          id: req.params.id,
          title: req.body.title,
          completed: req.body.completed,
        });
        res.json(todo);
      } catch (error) {
        res.status(400).json({ error: (error as Error).message });
      }
    });

    this.router.delete('/:id', async (req, res) => {
      try {
        await this.deleteTodoUseCase.execute(req.params.id);
        res.status(204).send();
      } catch (error) {
        res.status(400).json({ error: (error as Error).message });
      }
    });
  }

  getRouter() {
    return this.router;
  }
}