import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';
import { CustomerAuthController } from './customer.auth.controller';
import { CustomerOrderService } from './customer.order.service';
import { CustomerAuthModule } from '../customer-auth/customer-auth.module';
import { CustomerController } from './customer.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order]),
        CustomerAuthModule,
    ],
    controllers: [CustomerAuthController, CustomerController],
    providers: [CustomerOrderService],
})
export class CustomersModule { }
