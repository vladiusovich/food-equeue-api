import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Order } from '../orders/entities/order.entity';
import CustomerOrderInfoResponse from './models/customer-order-info.response';

@Injectable()
export class CustomerOrderService {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,

        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger,
    ) { }

    async getOrderByHash(hash: string): Promise<CustomerOrderInfoResponse> {
        const order = await this.ordersRepository.findOne({
            where: { hash },
            relations: ['branch'],
        });

        if (!order) {
            throw new NotFoundException(`Order not found`);
        }

        return {
            orderId: order.id,
            branchId: order.branch.id,
            status: order.status,
        };
    }
}
