import { Controller, Get, Inject, ParseIntPipe, Query } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { BranchService } from "./branches.service";
import { Branch } from "./entities/branch.entity";

@Controller('branches')
export class BranchesController {
    constructor(
        private readonly brancesService: BranchService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) { }


    @Get("")
    async getBranch(@Query("orderId", ParseIntPipe) orderId: number): Promise<Branch> {
        return await this.brancesService.getBranch(orderId);
    }
}
