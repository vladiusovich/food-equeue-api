import { Body, Controller, Inject, Post } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { CustomerOrderService } from "./customer.order.service";
import { IdentifyCustomerOrderResponse } from "./models/customer-order-info.response";
import IdentifyCustomerOrderRequest from "./models/requestes/Identify-customero-rder.request";
import { CustomerAuthService } from "../customer-auth/customer-auth.service";

// TODO
@Controller("customer/auth")
export class CustomerAuthController {
    constructor(
        private readonly customerOrderService: CustomerOrderService,
        private readonly customerAuthService: CustomerAuthService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) { }

    @Post("idenitify")
    async idenitify(@Body() request: IdentifyCustomerOrderRequest): Promise<IdentifyCustomerOrderResponse> {
        const token = this.customerAuthService.generateToken({ hash: request.hash });

        return {
            token,
        };
    }
}
