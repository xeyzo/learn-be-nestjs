import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// provide modeling data to database

export enum TaskStatus {
    Open = 'Open',
    InProgres = 'In Progres',
    Done = 'Done'
};


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