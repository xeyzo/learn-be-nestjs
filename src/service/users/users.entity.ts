import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// provide modeling data to database

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    email: string

    @Column()
    phonenumber: string
}