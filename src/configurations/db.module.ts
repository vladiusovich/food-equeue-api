import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../modules/client/orders/entities/order.entity';
import { Customer } from 'src/modules/client/customers/entities/customer.entity';
import { Product } from 'src/modules/staff/staff-products/entities/product.entity';
import { Branch } from 'src/modules/branches/entities/branch.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db.sqlite',
            entities: [Customer, Order, Product, Branch],
            //shouldn't be used in production - otherwise you can lose production data
            synchronize: true,
        }),
    ],
})
export class SqLiteDbModule { }
