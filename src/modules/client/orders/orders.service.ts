import { Inject, Injectable } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import OrdersStatus from './interfaces/ordersStatus';
import CustomerOrderStatus from './interfaces/customerOrderStatus';
import tryFormatFullName from './utility/formatHelper';

const getId = (order: Order): string => order.id.toString();

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,

        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger,
    ) { }

    async getOrdersStatus(): Promise<OrdersStatus> {
        const orders = await this.ordersRepository.findBy({
            status: In(["pending", "inProgress", "ready"]),
        });

        return {
            inProgress: orders.filter((order) => order.status === "inProgress" || order.status === "pending").map(getId),
            ready: orders.filter((order) => order.status === "ready").map(getId),
        };
    }

    async getCustomerOrderStatus(id: number): Promise<CustomerOrderStatus | null> {
        const order = await this.ordersRepository.findOne({
            where: { id },
            relations: ["products", "customer"],
        });

        this.logger.info(`Order: ${order}`);

        if (!order) {
            return null;
        }

        return {
            id: order.id.toString(),
            status: order.status,
            products: order.products.map((item) => item.name),
            customer: tryFormatFullName(order?.customer)
        };
    }
}
