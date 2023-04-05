import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todosRepository: Repository<Todo>,
  ) {}

  create(createTodoDto: CreateTodoDto) {
    return this.todosRepository.insert(createTodoDto);
  }

  findAll() {
    return this.todosRepository.find();
  }

  async findOne(todoId: number) {
    const todo = await this.todosRepository.findOneBy({ todoId });
    if (!todo) throw new NotFoundException();

    return todo;
  }

  async update(todoId: number, updateTodoDto: UpdateTodoDto) {
    const updateReusult = await this.todosRepository.update(
      todoId,
      updateTodoDto,
    );

    if (!updateReusult.affected) throw new NotFoundException();
  }

  remove(todoId: number) {
    try {
      return this.todosRepository.delete(todoId);
    } catch (_error) {
      throw new NotFoundException();
    }
  }
}
