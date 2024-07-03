import { Body, Controller, Get, Inject, Post, Put, Query } from '@nestjs/common';
import { OrdersStaffService } from './staff-orders.service';
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import CreateOrderRequest from './models/requests/create-order.request';
import UpdateOrderRequest from './models/requests/update-order.request';
import FindOrderRequest from './models/requests/find-order.request';

@Controller('staff')
export class OrdersStaffController {
    constructor(
        private readonly ordersService: OrdersStaffService,
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger) { }

    @Get('/orders')
    async find(@Query() request: FindOrderRequest) {
        return await this.ordersService.find(request);
    }

    @Post('/orders')
    async create(@Body() order: CreateOrderRequest) {
        return await this.ordersService.create(order);
    }

    @Put('/orders')
    async update(@Body() order: UpdateOrderRequest) {
        return await this.ordersService.update(order);
    }
}
