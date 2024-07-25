import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { OrderCreatedEvent } from '../events/order-created.event';
import { OrdersStaffInfoService } from '../staff-orders-info.service';
import { EventsGateway } from 'src/modules/common/events.gateway/events.gateway';

@Injectable()
export class OrderUpdatedListener {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger,

        @Inject(EventsGateway)
        private eventsGateway: EventsGateway,

        @Inject(OrdersStaffInfoService)
        private readonly ordersStaffInfoService: OrdersStaffInfoService,
    ) { }

    @OnEvent("order.updated")
    async handleOrderCreatedEvent(event: OrderCreatedEvent) {
        this.logger.info(`Order STAFF ${event.payload.id} pushed`);

        const ordersStatus = await this.ordersStaffInfoService.getOrdersStatus();

        this.eventsGateway.emitStaff("staff.orders.updated", ordersStatus);
    }
}