import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsGateway } from '../events.gateway/events.gateway';
import { OrdersStaffController } from './staff-orders.controller';
import { OrdersStaffInfoService } from './staff-orders-info.service';
import { OrdersStaffService } from './staff-orders.service';
import { Order } from '../orders/entities/order.entity';
import { Product } from '../staff-products/entities/product.entity';
import { Customer } from '../customers/entities/customer.entity';
import { OrderCreatedListener } from './listeners/order-created.listener';
import { OrderUpdatedListener } from './listeners/order-updated.listener';

@Module({
    imports: [
        // EventsGatewayModule,
        TypeOrmModule.forFeature([Order, Product, Customer]),
    ],
    controllers: [OrdersStaffController],
    providers: [
        OrdersStaffService, OrdersStaffInfoService,
        EventsGateway,
        OrderCreatedListener, OrderUpdatedListener,
    ],
})

export class OrdersStaffModule { }
