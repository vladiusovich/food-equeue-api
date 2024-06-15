import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from 'src/modules/orders/orders.service';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { OrderItem } from './entities/orderItem.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Order, OrderItem, Customer])],
    controllers: [OrdersController],
    providers: [OrdersService],
    exports: [TypeOrmModule],
})

export class OrdersModule { }