import { Inject, Injectable } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import CreateOrderDto from './models/requesties/createOrder.request';
import { Customer } from './entities/customer.entity';
import { OrderItem } from './entities/orderItem.entity';
import OrdersStatus from './interfaces/ordersStatus';
import CustomerOrderStatus from './interfaces/customerOrderStatus';
import tryFormatFullName from './utility/formatHelper';

const getId = (order: Order): string => order.id.toString();

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
        @InjectRepository(Customer)
        private customersRepository: Repository<Customer>,
        @InjectRepository(OrderItem)
        private orderItemsRepository: Repository<OrderItem>,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) { }

    async getOrdersStatus(): Promise<OrdersStatus> {
        const orders = await this.ordersRepository.findBy({
            status: In(["pending", "inProgress", "ready"]),
        });

        return {
            inProgress: orders.filter((order) => order.status === "inProgress" || order.status === "pending").map(getId),
            ready: orders.filter((order) => order.status === "ready").map(getId),
            //TODO: calculate waiting time
            // waitingTime: 10,
        };
    }

    async getCustomerOrderStatus(id: number): Promise<CustomerOrderStatus | null> {
        const order = await this.ordersRepository.findOne({
            where: { id },
            relations: ["items", "customer"],
        });

        this.logger.info(`Order: ${order}`);

        if (!order) {
            return null;
        }

        return {
            id: order.id.toString(),
            status: order.status,
            items: order.items.map((item) => item.name),
            customer: tryFormatFullName(order?.customer)
        };
    }

    findOne(id: number): Promise<Order | null> {
        return this.ordersRepository.findOneBy({ id });
    }

    // TODO: move to staff module
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
