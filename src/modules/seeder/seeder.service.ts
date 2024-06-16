import { Inject, Injectable } from '@nestjs/common';
import { Order } from '../orders/entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from '../orders/entities/orderItem.entity';
import { Customer } from '../orders/entities/customer.entity';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

const orderItems = [
    { id: 1, name: 'Item 1', price: 10 },
    { id: 2, name: 'Item 2', price: 20 },
    { id: 3, name: 'Item 3', price: 30 },
    { id: 4, name: 'Item 4', price: 40 },
    { id: 5, name: 'Item 5', price: 50 }
];

@Injectable()
export class SeederService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,

        @InjectRepository(OrderItem)
        private readonly orderItemRepository: Repository<OrderItem>,

        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,

        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger
    ) { }


    async seed(isDevelopment: boolean) {
        if (isDevelopment) {
            this.logger.info("Seeding data for dev env...");

            await this.seedOrderItems();
            await this.seedCustomers();
            await this.seedOrders();

            this.logger.info("Seeding data for dev env is done");
        }
    }

    async seedOrderItems() {
        await this.orderItemRepository.save(orderItems);
    }

    async seedCustomers() {
        const customers = [
            {
                id: 1,
                firstName: 'John',
                lastName: 'Doe',
            },
        ];

        await this.customerRepository.save(customers);
    }


    async seedOrders() {
        const orders: Order[] = [
            {
                id: 1,
                status: 'pending',
                items: orderItems,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                status: 'pending',
                items: orderItems,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 3,
                status: 'pending',
                items: orderItems,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ];

        await this.orderRepository.save(orders);
    }
}