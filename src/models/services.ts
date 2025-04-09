import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Plan } from "./plan";

export interface Service {
    id: number,
    despcription: string,
    logo: string,
    name: string
}

@Entity('services')
export class Service {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'varchar' })
    logo: string;

    @OneToMany(() => Plan, (plan) => plan.service)
    plans: Plan[];
}