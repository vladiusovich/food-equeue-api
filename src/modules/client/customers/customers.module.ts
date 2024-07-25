import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';
import { CustomerOrderService } from './customer.order.service';
import { CustomerController } from './customer.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order]),
    ],
    controllers: [CustomerController],
    providers: [CustomerOrderService],
})
export class CustomersModule { }
