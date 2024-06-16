import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from 'src/modules/orders/orders.service';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { OrderItem } from './entities/orderItem.entity';
import { OrderCreatedListener } from './listeners/order-created.listener';
import { EventsGateway } from '../events.gateway/events.gateway';

@Module({
    imports: [
        // EventsGatewayModule,
        TypeOrmModule.forFeature([Order, OrderItem, Customer]),
    ],
    controllers: [OrdersController],
    providers: [OrdersService, OrderCreatedListener, EventsGateway],
    exports: [TypeOrmModule, OrdersService],
})

export class OrdersModule { }