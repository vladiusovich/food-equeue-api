import { Controller, Get, Inject, Query } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { CustomerOrderService } from "./customer.order.service";
import CustomerOrderInfoResponse from "./models/customerOrderInfoResponse";

@Controller("customer")
export class CustomerController {
    constructor(
        private readonly customerOrderService: CustomerOrderService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) { }

    @Get("")
    async idenitify(@Query('hash') hash: string): Promise<CustomerOrderInfoResponse> {
        return await this.customerOrderService.getCustomerOrder(hash);
    }
}
