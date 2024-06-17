import { Body, Controller, Inject, Post } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import CreateProdactRequest from './models/requesties/create-product.request';
import { StaffProductsService } from './staff-products.service';

@Controller('staff')
export class StaffProductsController {
    constructor(
        private readonly staffProductService: StaffProductsService,
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger) { }


    @Post('/products')
    async create(@Body() product: CreateProdactRequest) {
        return this.staffProductService.create(product);
    }
}
