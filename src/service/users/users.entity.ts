import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// provide modeling data to database
export enum Roles {
    admin = 'admin',
    staff = 'staff'
}

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

    @Column()
    address: string

    @Column({
        type: 'enum',
        enum: Roles,
        default: Roles.staff,
    })
    role:Roles
}