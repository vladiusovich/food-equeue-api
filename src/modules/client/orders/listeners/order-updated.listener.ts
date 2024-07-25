import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { OrderCreatedEvent } from '../events/order-created.event';
import { OrdersService } from '../orders.service';
import { EventsGateway } from 'src/modules/common/events.gateway/events.gateway';

@Injectable()
export class OrderUpdatedListener {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger,

        @Inject(EventsGateway)
        private eventsGateway: EventsGateway,

        @Inject(OrdersService)
        private readonly ordersService: OrdersService,
    ) { }

    @OnEvent("order.updated")
    async handleOrderCreatedEvent(event: OrderCreatedEvent) {
        this.logger.info(`Order ${event?.payload?.id} pushed`);

        const ordersStatus = await this.ordersService.getOrdersStatus();

        this.eventsGateway.emitCustomer("customer.orders.updated", ordersStatus);
    }
}