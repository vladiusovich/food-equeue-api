import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Branch } from './entities/branch.entity';
import { Order } from '../client/orders/entities/order.entity';

@Injectable()
export class BranchService {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,

        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger,
    ) { }

    async getBranch(orderId: number): Promise<Branch> {
        const order = await this.ordersRepository.findOne({
            where: { id: orderId },
            relations: ["branch"],
        });

        if (!order) {
            throw new NotFoundException(`Cannot find order with id: ${orderId}`);
        }

        return order?.branch;
    }
}
