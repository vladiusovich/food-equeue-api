import { Inject, Injectable } from '@nestjs/common';
import { Order } from '../orders/entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../staff-products/entities/product.entity';
import { Customer } from '../customers/entities/customer.entity';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Branch } from '../branches/entities/branch.entity';

const products = [
    { id: 1, name: 'Item 1', price: 10 },
    { id: 2, name: 'Item 2', price: 20 },
    { id: 3, name: 'Item 3', price: 30 },
    { id: 4, name: 'Item 4', price: 40 },
    { id: 5, name: 'Item 5', price: 50 }
];

const branches = [
    {
        id: 1,
        name: 'Chemi Chachapuri',
        address: 'ვაჟა-ფშაველას გამზირი, Tbilisi',
        description: 'Description random type of food',
        defaultOrderExecutionTime: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 2,
        name: 'Branch 2',
        address: 'Address 2',
        description: 'Description 2',
        defaultOrderExecutionTime: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

@Injectable()
export class SeederService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,

        @InjectRepository(Product)
        private readonly orderItemRepository: Repository<Product>,

        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,

        @InjectRepository(Branch)
        private readonly branchRepository: Repository<Branch>,

        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger
    ) { }


    async seed(isDevelopment: boolean) {
        if (isDevelopment) {
            this.logger.info("Seeding data for dev env...");

            await this.seedBranches();
            await this.seedProducts();
            await this.seedCustomers();
            await this.seedOrders();

            this.logger.info("Seeding data for dev env is done");
        }
    }

    async seedProducts() {
        await this.orderItemRepository.save(products);
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
                products: products,
                createdAt: new Date(),
                updatedAt: new Date(),
                branch: branches[0],
            },
            {
                id: 2,
                status: 'pending',
                products: products,
                createdAt: new Date(),
                updatedAt: new Date(),
                branch: branches[0],
            },
            {
                id: 3,
                status: 'pending',
                products: products,
                createdAt: new Date(),
                updatedAt: new Date(),
                branch: branches[0],
            }
        ];

        await this.orderRepository.save(orders);
    }

    async seedBranches() {
        await this.branchRepository.save(branches);
    }
}