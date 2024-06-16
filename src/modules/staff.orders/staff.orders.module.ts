import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsGateway } from '../events.gateway/events.gateway';
import { OrdersStaffController } from './staff.orders.controller';
import { OrdersStaffInfoService } from './staff.orders.info.service';
import { OrdersStaffService } from './staff.orders.service';
import { Order } from '../orders/entities/order.entity';
import { OrderItem } from '../orders/entities/orderItem.entity';
import { Customer } from '../orders/entities/customer.entity';
import { OrderCreatedListener } from './listeners/order-created.listener';

@Module({
    imports: [
        // EventsGatewayModule,
        TypeOrmModule.forFeature([Order, OrderItem, Customer]),
    ],
    controllers: [OrdersStaffController],
    providers: [OrdersStaffService, OrdersStaffInfoService, EventsGateway, OrderCreatedListener],
})

export class OrdersStaffModule { }
