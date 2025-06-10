// src/domain/use-cases/delete-todo.ts
import { Todo } from '../entities/todo';
import { TodoRepository } from '../repositories/todo-repository';

export class DeleteTodoUseCase {
  constructor(private todoRepository: TodoRepository) {}

  async execute(id: string): Promise<void> {
    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    await this.todoRepository.delete(id);
  }
}