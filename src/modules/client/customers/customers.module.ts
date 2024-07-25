import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';
import { CustomerOrderService } from './customer.order.service';
import { CustomerController } from './customer.controller';
import { CustomerAuthGuard } from '../customer-auth/customer-auth-gurd';
import { CustomerAuthModule } from '../customer-auth/customer-auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order]),
        CustomerAuthModule,
    ],
    controllers: [CustomerController],
    providers: [
        CustomerOrderService,
        CustomerAuthGuard,
    ],
})
export class CustomersModule { }
