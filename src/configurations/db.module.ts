import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../modules/orders/entities/order.entity';
import { Customer } from 'src/modules/customers/entities/customer.entity';
import { Product } from 'src/modules/staff-products/entities/product.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db.sqlite',
            entities: [Customer, Order, Product],
            //shouldn't be used in production - otherwise you can lose production data
            synchronize: true,
        }),
    ],
})
export class SqLiteDbModule { }
