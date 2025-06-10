// src/domain/use-cases/get-todo.ts
import { Todo } from '../entities/todo';
import { TodoRepository } from '../repositories/todo-repository';

export class GetTodoUseCase {
  constructor(private todoRepository: TodoRepository) {}

  async execute(id: string): Promise<Todo | null> {
    return this.todoRepository.findById(id);
  }
}