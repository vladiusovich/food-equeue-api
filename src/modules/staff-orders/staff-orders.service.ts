import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { EventEmitter2 } from '@nestjs/event-emitter';
import CreateOrderRequest from './models/requests/create-order.request';
import { Order } from '../orders/entities/order.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Product } from '../staff-products/entities/product.entity';
import UpdateOrderRequest from './models/requests/update-order.request';
import FindOrderRequest from './models/requests/find-order.request';
import { formatPlainText, generateHash } from './utility/hash.generator';
import { Branch } from '../branches/entities/branch.entity';

@Injectable()
export class OrdersStaffService {
    constructor(
        private eventEmitter: EventEmitter2,
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,

        @InjectRepository(Branch)
        private branchesRepository: Repository<Branch>,
        @InjectRepository(Customer)
        private customersRepository: Repository<Customer>,

        @InjectRepository(Product)
        private productsRepository: Repository<Product>,

        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger,
    ) { }

    async find(request: FindOrderRequest): Promise<Order[]> {
        const orders = await this.ordersRepository.find({
            relations: {
                customer: true,
                products: true,
            },
            where: {
                ...request,
            },
        });

        return orders ?? [];
    }

    async create(request: CreateOrderRequest): Promise<Order> {
        const newOrder = new Order();

        // Set customer if customerId is provided
        newOrder.customer = request.customerId
            ? await this.customersRepository.findOneBy({ id: request.customerId })
            : null;

        const branch = await this.branchesRepository.findOneBy({ id: request.branchId });

        if (!branch) {
            throw new Error(`Branch with id ${request.branchId} not found`);
        };

        // Set order status and products
        newOrder.status = "pending";
        newOrder.products = await this.productsRepository.findBy({ id: In(request.products) });
        newOrder.branch = branch;

        // Save the new order
        const createdOrder = await this.ordersRepository.save(newOrder);

        const plainText = formatPlainText({
            id: createdOrder.id,
            branchId: request.branchId,
        });

        // Generate hash
        createdOrder.hash = await generateHash(plainText);

        await this.ordersRepository.save(createdOrder);

        this.logger.info(`Order created successfully: ${newOrder.id}`);

        this.eventEmitter.emit(
            "order.created",
            {
                orderId: createdOrder.id,
                payload: createdOrder,
            });

        return createdOrder;
    }

    async update(order: UpdateOrderRequest): Promise<Order> {
        const toUpdateOrder = await this.ordersRepository.findOneBy({
            id: order.id,
        });

        if (!toUpdateOrder) {
            throw new Error(`Order with id ${order.id} not found`);
        }

        const updatedOrder = await this.ordersRepository.save({
            ...toUpdateOrder,
            status: order.status,
            readyAt: order.status === "ready" ? new Date() : undefined,
        });

        this.eventEmitter.emit(
            "order.updated",
            {
                orderId: updatedOrder.id,
                payload: updatedOrder,
            });

        return updatedOrder;
    }
}
