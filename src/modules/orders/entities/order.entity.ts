import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, UpdateDateColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Customer } from './customer.entity';
import { Product } from './product.entity';
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

    @ManyToMany(() => Product, {
        cascade: true,
    })
    @JoinTable()
    products: Product[];
}
