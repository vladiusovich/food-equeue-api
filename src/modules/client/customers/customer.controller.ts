import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { CustomerOrderService } from "./customer.order.service";
import CustomerOrderInfoResponse from "./models/customer-order-info.response";
import { CustomerAuthGuard } from "../customer-auth/customer-auth-gurd";

@Controller("customer")
@UseGuards(CustomerAuthGuard)
export class CustomerController {
    constructor(
        private readonly customerOrderService: CustomerOrderService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) { }

    @Post("order")
    async findOne(@Body() request: { hash: string }): Promise<CustomerOrderInfoResponse> {
        const orderInfo = await this.customerOrderService.getOrderByHash(request.hash);

        return orderInfo;
    }
}
