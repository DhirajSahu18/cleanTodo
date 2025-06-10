// src/main.ts
import { Server } from './infrastructure/server';
import { PrismaTodoRepository } from './infrastructure/repositories/prisma-todo-repository';
import { CreateTodoUseCase } from './domain/use-cases/create-todo';
import { GetTodoUseCase } from './domain/use-cases/get-todo';
import { GetAllTodosUseCase } from './domain/use-cases/get-all-todos';
import { UpdateTodoUseCase } from './domain/use-cases/update-todo';
import { DeleteTodoUseCase } from './domain/use-cases/delete-todo';
import { TodoController } from './infrastructure/controllers/todo-controller';

const todoRepository = new PrismaTodoRepository();
const createTodoUseCase = new CreateTodoUseCase(todoRepository);
const getTodoUseCase = new GetTodoUseCase(todoRepository);
const getAllTodosUseCase = new GetAllTodosUseCase(todoRepository);
const updateTodoUseCase = new UpdateTodoUseCase(todoRepository);
const deleteTodoUseCase = new DeleteTodoUseCase(todoRepository);
const todoController = new TodoController(
  createTodoUseCase,
  getTodoUseCase,
  getAllTodosUseCase,
  updateTodoUseCase,
  deleteTodoUseCase,
);
const server = new Server(todoController);
server.start(3000);