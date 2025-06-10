// src/domain/use-cases/update-todo.ts
import { Todo } from '../entities/todo';
import { TodoRepository } from '../repositories/todo-repository';

interface UpdateTodoInput {
  id: string;
  title?: string;
  completed?: boolean;
}

export class UpdateTodoUseCase {
  constructor(private todoRepository: TodoRepository) {}

  async execute(input: UpdateTodoInput): Promise<Todo> {
    const todo = await this.todoRepository.findById(input.id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    const updatedTodo: Todo = {
      ...todo,
      title: input.title ?? todo.title,
      completed: input.completed ?? todo.completed,
    };
    return this.todoRepository.update(updatedTodo);
  }
}
