import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Subscription } from "./subscription";

export interface PaymentRequest {
    amount: number,
    payment_date: Date,
    state: 'Paid' | 'Pending',
    subscribe_id: number
}

export interface PaymentUpdate {
    payment_date: Date,
    state: 'Paid' | 'Pending',
    subscribe_id: number
}

export interface Payment extends PaymentRequest {
    id: number
}

@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Column({ type: Date })
    payment_date: Date;

    @Column({ type: 'varchar' })
    state: 'Paid' | 'Pending';

    @ManyToOne(() => Subscription)
    @JoinColumn({ name: 'subscribe_id' })
    subscription: Subscription;
}