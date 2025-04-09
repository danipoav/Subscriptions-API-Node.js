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

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'varchar' })
    rol: 'ADMIN' | 'USER';
}