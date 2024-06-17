import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { EventEmitter2 } from '@nestjs/event-emitter';
import CreateOrderRequest from './models/requesties/create-order.request';
import { Order } from '../orders/entities/order.entity';
import { Customer } from '../orders/entities/customer.entity';
import { Product } from '../orders/entities/product.entity';
import UpdateOrderRequest from './models/requesties/update-order.request';

@Injectable()
export class OrdersStaffService {

    constructor(
        private eventEmitter: EventEmitter2,
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,

        @InjectRepository(Customer)
        private customersRepository: Repository<Customer>,

        @InjectRepository(Product)
        private productsRepository: Repository<Product>,

        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger,
    ) { }

    async create(order: CreateOrderRequest): Promise<Order> {
        try {
            const newOrder = new Order();

            // Set customer if customerId is provided
            newOrder.customer = order.customerId
                ? await this.customersRepository.findOneBy({ id: order.customerId })
                : null;

            // Set order status and products
            newOrder.status = "pending";
            newOrder.products = await this.productsRepository.findBy({ id: In(order.products) });

            // Save the new order
            const createdOrder = await this.ordersRepository.save(newOrder);

            this.logger.info(`Order created successfully: ${newOrder.id}`);

            this.eventEmitter.emit(
                "order.created",
                {
                    orderId: 1,
                    payload: createdOrder,
                });

            return createdOrder;
        } catch (error) {
            this.logger.error(`Failed to create order: ${error.message}`);
            throw new Error(`Order creation failed: ${error.message}`);
        }
    }

    async update(order: UpdateOrderRequest): Promise<Order> {
        try {
            const toUpdatedOrder = await this.ordersRepository.findOneBy({
                id: order.id,
            });

            const updatedOrder = await this.ordersRepository.save({ ...toUpdatedOrder, status: order.status });

            this.eventEmitter.emit(
                "order.updated",
                {
                    orderId: 1,
                    payload: updatedOrder,
                });

            return updatedOrder;
        } catch (error) {
            this.logger.error(`Failed to create order: ${error.message}`);
            throw new Error(`Order creation failed: ${error.message}`);
        }
    }
}
