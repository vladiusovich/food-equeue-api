import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Order } from '../orders/entities/order.entity';
import { Customer } from '../orders/entities/customer.entity';
import { OrderItem } from '../orders/entities/orderItem.entity';

@Injectable()
export class OrdersStaffInfoService {

    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,

        @InjectRepository(Customer)
        private customersRepository: Repository<Customer>,

        @InjectRepository(OrderItem)
        private orderItemsRepository: Repository<OrderItem>,

        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger,
    ) { }


    async getOrdersStatus(): Promise<Order[]> {
        const orders = await this.ordersRepository.find({
            relations: ["items", "customer"],
        });

        return orders;
    }
}
