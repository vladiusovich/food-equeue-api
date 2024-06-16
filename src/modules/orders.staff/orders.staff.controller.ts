import { Body, Controller, Inject, Post } from '@nestjs/common';
import { OrdersStaffService } from './orders.staff.service';
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import CreateOrderDto from './models/requesties/createOrder.request';

@Controller('staff')
export class OrdersStaffController {
    constructor(
        private readonly ordersService: OrdersStaffService,
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger) { }


    //TODO
    @Post('/orders')
    async create(@Body() order: CreateOrderDto) {
        return this.ordersService.create(order);
    }

    // @Post('create')
    // async create(@Body() order: CreateOrderDto) {
    //     return this.ordersService.create(order);
    // }
}
