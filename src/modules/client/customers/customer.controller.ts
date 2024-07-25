import { Body, Controller, Inject, Post } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { CustomerOrderService } from "./customer.order.service";
import CustomerOrderInfoResponse from "./models/customer-order-info.response";
import { CustomerAuthService } from "../customer-auth/customer-auth.service";

// TODO
@Controller("customer")
export class CustomerController {
    constructor(
        private readonly customerOrderService: CustomerOrderService,
        private readonly customerAuthService: CustomerAuthService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) { }

    // TODO: implemet based on token
    @Post("order")
    async findOne(@Body() request: { hash: string }): Promise<CustomerOrderInfoResponse> {
        const orderInfo = await this.customerOrderService.getOrderByHash(request.hash);

        return orderInfo;
    }
}
