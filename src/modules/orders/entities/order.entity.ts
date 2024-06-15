import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, UpdateDateColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Customer } from './customer.entity';
import { OrderItem } from './orderItem.entity';
import StatusType from '../types/StatusType';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Customer, customer => customer.orders, { nullable: true })
    customer?: Customer | null;

    @Column()
    status: StatusType;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ nullable: true })
    readyAt?: Date;

    @Column({ nullable: true })
    deliveredAt?: Date;

    @ManyToMany(() => OrderItem, {
        cascade: true,
    })
    @JoinTable()
    items: OrderItem[];
}
