import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  //get all tasks
  @Get()
  async findAll(): Promise<Task[]> {
    return await this.taskService.findall();
  }

  //get one task
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Task> {
    const task = await this.taskService.findOne(id);
    if (!task) {
      throw new Error('Task not found');
    } else {
      return task;
    }
  }

  //create task
  // @Post()
  // async create(@Body() task: Task): Promise<Task> {
  //   return await this.taskService.create(task);
  // }

  @Post()
  async create(@Body() task: Task): Promise<Task> {
    return this.taskService.create(task);
  }

  //update task
  @Put(':id')
  async update(@Param('id') id: number, @Body() task: Task): Promise<Task | null> {
    return this.taskService.update(id, task);
  }

  //delete task
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    //handle the error if task not found
    const task = await this.taskService.findOne(id);
    if (!task) {
      throw new Error('Task not found');
    }
    return this.taskService.delete(id);
  }
}