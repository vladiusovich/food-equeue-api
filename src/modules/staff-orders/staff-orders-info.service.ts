import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Order } from '../orders/entities/order.entity';
import { Customer } from '../orders/entities/customer.entity';
import { Product } from '../orders/entities/product.entity';

@Injectable()
export class OrdersStaffInfoService {

    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,

        @InjectRepository(Customer)
        private customersRepository: Repository<Customer>,

        @InjectRepository(Product)
        private productsRepository: Repository<Product>,

        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger,
    ) { }


    async getOrdersStatus(): Promise<Order[]> {
        const orders = await this.ordersRepository.find({
            relations: ["products", "customer"],
        });

        return orders;
    }
}
