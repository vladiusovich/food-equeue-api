import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../modules/orders/entities/order.entity';
import { Customer } from 'src/modules/orders/entities/customer.entity';
import { Product } from 'src/modules/orders/entities/product.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db.sqlite',
            entities: [Customer, Order, Product],
            synchronize: true, //shouldn't be used in production - otherwise you can lose production data.
        }),
    ],
})
export class SqLiteDbModule { }
