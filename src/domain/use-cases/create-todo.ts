// src/domain/use-cases/create-todo.ts
import { Todo } from '../entities/todo';
import { TodoRepository } from '../repositories/todo-repository';

interface CreateTodoInput {
  title: string;
}

export class CreateTodoUseCase {
  constructor(private todoRepository: TodoRepository) {}

  async execute(input: CreateTodoInput): Promise<Todo> {
    const todo: Todo = {
      id: Math.random().toString(36).substr(2, 9),
      title: input.title,
      completed: false,
      createdAt: new Date(),
    };
    return this.todoRepository.create(todo);
  }
}

