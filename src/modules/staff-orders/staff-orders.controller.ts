import { Body, Controller, Inject, Post, Put } from '@nestjs/common';
import { OrdersStaffService } from './staff-orders.service';
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import CreateOrderRequest from './models/requesties/create-order.request';
import UpdateOrderRequest from './models/requesties/update-order.request';

@Controller('staff')
export class OrdersStaffController {
    constructor(
        private readonly ordersService: OrdersStaffService,
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger) { }


    //TODO
    @Post('/orders')
    async create(@Body() order: CreateOrderRequest) {
        return await this.ordersService.create(order);
    }

    @Put('/orders')
    async update(@Body() order: UpdateOrderRequest) {
        return await this.ordersService.update(order);
    }

    // @Post('create')
    // async create(@Body() order: CreateOrderDto) {
    //     return this.ordersService.create(order);
    // }
}
