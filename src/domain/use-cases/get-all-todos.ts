// src/domain/use-cases/get-all-todos.ts
import { Todo } from '../entities/todo';
import { TodoRepository } from '../repositories/todo-repository';

export class GetAllTodosUseCase {
  constructor(private todoRepository: TodoRepository) {}

  async execute(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }
}