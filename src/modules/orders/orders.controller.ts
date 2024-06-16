import { Controller, Get, Inject, NotFoundException, Query } from "@nestjs/common";
import { OrdersService as OrdersService } from "src/modules/orders/orders.service";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import OrdersStatus from "./interfaces/ordersStatus";
import CustomerOrderStatus from "./interfaces/customerOrderStatus";

@Controller("orders")
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) { }

    @Get("")
    async getOrdersStatus(): Promise<OrdersStatus> {
        return this.ordersService.getOrdersStatus();
    }

    @Get("customer")
    async getCustomerOrderStatus(@Query("id") id: string): Promise<CustomerOrderStatus | null> {
        const pId = Number.parseInt(id);

        if (isNaN(pId)) {
            throw new NotFoundException(`Order with id '${id}' not found`);
        }

        const orderStatus = await this.ordersService.getCustomerOrderStatus(pId);

        if (!orderStatus) {
            throw new NotFoundException(`Order with id '${id}' not found`);
        }

        return orderStatus;
    }
}
