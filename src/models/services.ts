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

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    logo: string;

    @OneToMany(() => Plan, (plan) => plan.service)
    plans: Plan[];
}