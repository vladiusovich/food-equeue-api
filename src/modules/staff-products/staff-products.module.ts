import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';
import { Product } from '../orders/entities/product.entity';
import { Customer } from '../orders/entities/customer.entity';
import { StaffProductsController } from './staff-products.controller';
import { StaffProductsService } from './staff-products.service';

@Module({
    imports: [
        // EventsGatewayModule,
        TypeOrmModule.forFeature([Order, Product, Customer]),
    ],
    controllers: [StaffProductsController],
    providers: [StaffProductsService],
})

export class StaffProductsModule { }
