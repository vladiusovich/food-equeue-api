import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';
import { Product } from '../staff-products/entities/product.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Branch } from '../branches/entities/branch.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Customer, Order, Product, Branch])],
    providers: [SeederService],
})

export class SeederModule { }
