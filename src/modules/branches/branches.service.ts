import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Branch } from './entities/branch.entity';

@Injectable()
export class BranchService {
    constructor(
        @InjectRepository(Branch)
        private ordersRepository: Repository<Branch>,

        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger,
    ) { }

    async getBranches(): Promise<Branch[]> {
        return this.ordersRepository.find();
    }
}
