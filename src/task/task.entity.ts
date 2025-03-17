import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import { Transform } from 'class-transformer';
import * as moment from 'moment';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @Transform(({ value }) => moment(value, 'MM-DD-YYYY').toDate(), { toClassOnly: true })
    dueDate: Date;

  @Column()
  status: string;

  @Column()
  priority: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  dateOfCreation: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })  
  details: string;
}