import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { OrderCreatedEvent } from '../events/order-created.event';
import { EventsGateway } from 'src/modules/events.gateway/events.gateway';

@Injectable()
export class OrderCreatedListener {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger,

        @Inject(EventsGateway)
        private eventsGateway: EventsGateway,
    ) { }

    // TODO: move to staff API
    // TODO: push event to customers and staff
    @OnEvent('order.created')
    handleOrderCreatedEvent(event: OrderCreatedEvent) {
        this.logger.info(`Order ${event.payload.id} pushed`);

        this.eventsGateway.ordersUpdate(event.payload);
    }
}