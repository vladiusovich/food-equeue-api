import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName?: string;

    @Column({ nullable: true })
    lastName?: string;

    @OneToMany(() => Order, order => order.customer)
    orders: Order[];
}
