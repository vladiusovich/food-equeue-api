import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OrderExecutionCalculatorService } from './order-execution-calculator-service';
import { EventsGateway } from '../events.gateway/events.gateway';

@Injectable()
export class TaskCalculatorService {
    constructor(
        @Inject(OrderExecutionCalculatorService)
        private readonly orderExecutionCalculatorService: OrderExecutionCalculatorService,

        @Inject(EventsGateway)
        private eventsGateway: EventsGateway,
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger
    ) { }

    @Cron(CronExpression.EVERY_10_SECONDS)
    async calculateExecutionTime() {
        const executionTime = await this.orderExecutionCalculatorService.getAverage();

        this.eventsGateway.emitCustomer("customer.orders.executionTimeChanged", executionTime);
        this.eventsGateway.emitStaff("staff.orders.executionTimeChanged", executionTime);
    }
}
