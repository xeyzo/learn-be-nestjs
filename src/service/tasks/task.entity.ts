import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../users/users.entity";

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

    @ManyToOne(() => UserEntity, (user) => user.tasks, { onDelete: 'CASCADE' })
    user: UserEntity;
}