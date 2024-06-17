import { Inject, Injectable } from '@nestjs/common';
import { Order } from '../orders/entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { startOfToday, endOfToday } from 'date-fns';
import { calculateAverage, calculateMedian } from './utility/culculator.helper';

// TODO: move to config or DB
const DEFAULT_EXECUTION_TIME = 5;

@Injectable()
export class OrderExecutionCalculatorService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,

        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger
    ) { }

    async getAverage() {
        const readyOrders = await this.getReadyOrders();

        if (readyOrders.length === 0) {
            return Math.round(DEFAULT_EXECUTION_TIME);
        }

        return calculateAverage(readyOrders);
    }

    async getMedian() {
        const readyOrders = await this.getReadyOrders();

        if (readyOrders.length === 0) {
            return Math.round(DEFAULT_EXECUTION_TIME);
        }

        return calculateMedian(readyOrders);
    }

    private async getReadyOrders() {
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

        return readyOrders;
    }
}
