import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Plan } from "./plan";

export interface SubscriptionRequest {
    renewal_date: Date,
    start_date: Date,
    plan_id: string,
    user_id: string
}

export interface Subscription extends SubscriptionRequest {
    id: number
}

@Entity('subscriptions')
export class Subscription {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: Date })
    renewal_date: Date;

    @Column({ type: Date })
    start_date: Date;

    @ManyToOne(() => Plan)
    @JoinColumn({ name: 'plan_id' })
    plan: Plan;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;
}