import { Controller, Inject } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { BranchService } from "./branches.service";

@Controller('branches')
export class BranchesController {
    constructor(
        private readonly brancesService: BranchService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) { }


    // @Get("")
    // async getBranche(): Promise<Branch> {
    //     return await this.brancesService.getBranches();
    // }
}
