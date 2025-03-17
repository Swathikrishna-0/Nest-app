import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import * as moment from 'moment';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) { }

    // get all tasks
    async findall(): Promise<Task[]> {
        return await this.taskRepository.find();
    }

    // get one task
    async findOne(id: number): Promise<Task | null> {
        return await this.taskRepository.findOne({ where: { id } });
    }

    //create task
    async create(task: Task): Promise<Task> {
        if (task.dueDate) {
            // Convert "DD-MM-YYYY" to ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)
            task.dueDate = moment(task.dueDate, 'MM-DD-YYYY').toDate();
        }
        const newTask = this.taskRepository.create(task);
        return await this.taskRepository.save(newTask);
    }

    // update task
    async update(id: number, task: Task): Promise<Task | null> {
        if (task.dueDate) {
            // Convert "DD-MM-YYYY" to Date object
            task.dueDate = moment(task.dueDate, 'MM-DD-YYYY').toDate();
        }
        
        await this.taskRepository.update(id, task);
        return await this.taskRepository.findOne({ where: { id } });
    }
    // delete task
    async delete(id: number): Promise<void> {
        await this.taskRepository.delete(id);
    }
}