// src/infrastructure/repositories/prisma-todo-repository.ts
import { PrismaClient } from '@prisma/client';
import { Todo } from '../../domain/entities/todo';
import { TodoRepository } from '../../domain/repositories/todo-repository';

const prisma = new PrismaClient();

export class PrismaTodoRepository implements TodoRepository {
  async create(todo: Todo): Promise<Todo> {
    const created = await prisma.todo.create({
      data: {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        createdAt: todo.createdAt,
      },
    });
    return {
      id: created.id,
      title: created.title,
      completed: created.completed,
      createdAt: new Date(created.createdAt),
    };
  }

  async findById(id: string): Promise<Todo | null> {
    const todo = await prisma.todo.findUnique({
      where: { id },
    });
    if (!todo) return null;
    return {
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      createdAt: new Date(todo.createdAt),
    };
  }

  async findAll(): Promise<Todo[]> {
    const todos = await prisma.todo.findMany();
    return todos.map((todo : any) => ({
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      createdAt: new Date(todo.createdAt),
    }));
  }

  async update(todo: Todo): Promise<Todo> {
    const updated = await prisma.todo.update({
      where: { id: todo.id },
      data: {
        title: todo.title,
        completed: todo.completed,
      },
    });
    return {
      id: updated.id,
      title: updated.title,
      completed: updated.completed,
      createdAt: new Date(updated.createdAt),
    };
  }

  async delete(id: string): Promise<void> {
    await prisma.todo.delete({
      where: { id },
    });
  }
}