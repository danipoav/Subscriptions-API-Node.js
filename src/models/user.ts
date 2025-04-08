import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface User {
    id: number,
    email: string,
    name: string,
    rol: 'ADMIN' | 'USER'
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    rol: 'ADMIN' | 'USER';
}