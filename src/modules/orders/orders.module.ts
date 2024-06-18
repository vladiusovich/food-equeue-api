import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from 'src/modules/orders/orders.service';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderCreatedListener } from './listeners/order-created.listener';
import { EventsGateway } from '../events.gateway/events.gateway';
import { OrderUpdatedListener } from './listeners/order-updated.listener';

@Module({
    imports: [
        // EventsGatewayModule,
        TypeOrmModule.forFeature([Order]),
    ],
    controllers: [OrdersController],
    providers: [
        OrdersService, EventsGateway,
        OrderCreatedListener, OrderUpdatedListener,
    ],
    exports: [TypeOrmModule],
})

export class OrdersModule { }