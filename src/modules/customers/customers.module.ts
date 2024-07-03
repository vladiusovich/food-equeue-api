import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';
import { CustomerController } from './customer.controller';
import { CustomerOrderService } from './customer.order.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order]),
    ],
    controllers: [CustomerController],
    providers: [CustomerOrderService],
})
export class CustomersModule { }
