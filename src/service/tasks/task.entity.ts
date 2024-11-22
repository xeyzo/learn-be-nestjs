import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";

// provide modeling data to database

@Entity()
export class TaskEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column()
    description: string

    @Column({
        type: 'enum',
        enum: TaskStatus,
        default: TaskStatus.Open,
    })
    status: TaskStatus
}