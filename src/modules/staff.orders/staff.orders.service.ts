import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { EventEmitter2 } from '@nestjs/event-emitter';
import CreateOrderDto from './models/requesties/createOrder.request';
import { Order } from '../orders/entities/order.entity';
import { Customer } from '../orders/entities/customer.entity';
import { OrderItem } from '../orders/entities/orderItem.entity';

@Injectable()
export class OrdersStaffService {

    constructor(
        private eventEmitter: EventEmitter2,
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,

        @InjectRepository(Customer)
        private customersRepository: Repository<Customer>,

        @InjectRepository(OrderItem)
        private orderItemsRepository: Repository<OrderItem>,

        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger,
    ) { }

    async create(order: CreateOrderDto): Promise<void> {
        try {
            // TODO: generate an items via staff api or\and config
            // Create items first
            await this.createItems(order.items);

            const newOrder = new Order();

            // Set customer if customerId is provided
            newOrder.customer = order.customerId
                ? await this.customersRepository.findOneBy({ id: order.customerId })
                : null;

            // Set order status and items
            newOrder.status = "pending";
            newOrder.items = await this.orderItemsRepository.findBy({ id: In(order.items) });

            // Save the new order
            await this.ordersRepository.save(newOrder);

            this.logger.info(`Order created successfully: ${newOrder.id}`);

            this.eventEmitter.emit(
                "order.created",
                {
                    orderId: 1,
                    payload: newOrder,
                    description: 'Order created successfully',
                });
        } catch (error) {
            this.logger.error(`Failed to create order: ${error.message}`);
            throw new Error(`Order creation failed: ${error.message}`);
        }
    }

    async createItems(items: number[]): Promise<void> {
        const itemsToCreate = items.map((itemId) => {
            const item = new OrderItem();
            item.id = itemId;
            item.price = 10;
            item.name = `Item ${itemId}`;
            return item;
        });

        await this.orderItemsRepository.save(itemsToCreate);
    }
}
