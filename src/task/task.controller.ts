import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  //get all tasks
  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Returns all tasks.' })
  async findAll(): Promise<Task[]> {
    return await this.taskService.findall();
  }

  //get one task
  @Get(':id')
  @ApiOperation({ summary: 'Get task by ID' })
  @ApiResponse({ status: 200, description: 'Returns a single task.' })
  async findOne(@Param('id') id: number): Promise<Task> {
    const task = await this.taskService.findOne(id);
    if (!task) {
      throw new Error('Task not found');
    } else {
      return task;
    }
  }

  //create task
  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task created successfully.' })
  @ApiBody({ type: Task })
  async create(@Body() task: Task): Promise<Task> {
    return this.taskService.create(task);
  }

  //update task
  @Put(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({ status: 200, description: 'Task updated successfully.' })
  async update(@Param('id') id: number, @Body() task: Task): Promise<Task | null> {
    return this.taskService.update(id, task);
  }

  //delete task
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully.' })
  async delete(@Param('id') id: number): Promise<void> {
    //handle the error if task not found
    const task = await this.taskService.findOne(id);
    if (!task) {
      throw new Error('Task not found');
    }
    return this.taskService.delete(id);
  }
}