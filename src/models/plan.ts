import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Service } from "./services";

export interface Plan {
    id: number,
    name: string,
    period: '1 mes' | '1 año',
    price: number,
    service_id: number
}

@Entity('plans')
export class Plan {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    period: '1 mes' | '1 año';
  
    @Column('decimal', { precision: 10, scale: 2 })
    price: number;
  
    @ManyToOne(() => Service, (service) => service.plans)
    @JoinColumn({ name: 'service_id' }) // Este será el campo de la relación
    service: Service;
  }