import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersStaffController } from './staff-orders.controller';
import { OrdersStaffInfoService } from './staff-orders-info.service';
import { OrdersStaffService } from './staff-orders.service';
import { Order } from '../../client/orders/entities/order.entity';
import { Product } from '../staff-products/entities/product.entity';
import { Customer } from '../../client/customers/entities/customer.entity';
import { OrderCreatedListener } from './listeners/order-created.listener';
import { OrderUpdatedListener } from './listeners/order-updated.listener';
import { Branch } from '../../branches/entities/branch.entity';
import { EventsGateway } from 'src/modules/common/events.gateway/events.gateway';

@Module({
    imports: [
        // EventsGatewayModule,
        TypeOrmModule.forFeature([Order, Product, Customer, Branch]),
    ],
    controllers: [OrdersStaffController],
    providers: [
        OrdersStaffService, OrdersStaffInfoService,
        EventsGateway,
        OrderCreatedListener, OrderUpdatedListener,
    ],
})

export class OrdersStaffModule { }
