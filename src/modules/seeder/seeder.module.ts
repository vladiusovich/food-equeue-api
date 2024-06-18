import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';
import { Product } from '../staff-products/entities/product.entity';
import { Customer } from '../customers/entities/customer.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Customer, Order, Product])],
    providers: [SeederService],
})

export class SeederModule { }
