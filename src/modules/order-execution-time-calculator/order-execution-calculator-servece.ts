import { Inject, Injectable } from '@nestjs/common';
import { Order } from '../orders/entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { startOfToday, endOfToday } from 'date-fns';
import { calculateMedianExecutionTime } from './utility/culculator.helper';

@Injectable()
export class OrderExecutionCalculatorService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,

        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger
    ) { }

    async calculateExecutionTime() {
        const start = startOfToday();
        const end = endOfToday();

        const orders = await this.orderRepository.find({
            where: {
                createdAt: MoreThanOrEqual(start),
                readyAt: LessThanOrEqual(end),
            },
            select: ['createdAt', 'readyAt'],
        });

        const readyOrders = orders.filter(order => order.readyAt);

        const executionTime = calculateMedianExecutionTime(readyOrders);

        return executionTime;
    }
}
