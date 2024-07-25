import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { OrderExecutionCalculatorService } from '../order-execution-calculator-service';
import { EventsGateway } from '../../events.gateway/events.gateway';

@Injectable()
export class OrderCreatedListener {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger,

        @Inject(EventsGateway)
        private eventsGateway: EventsGateway,

        @Inject(OrderExecutionCalculatorService)
        private readonly orderExecutionCalculatorService: OrderExecutionCalculatorService,
    ) { }

    @OnEvent("order.updated")
    async handleOrderCreatedEvent() {
        this.logger.info(`Calculate order execution time`);

        const expirationTime = await this.orderExecutionCalculatorService.getAverage();

        this.eventsGateway.emitCustomer("customer.orders.executionTimeChanged", expirationTime);
    }
}