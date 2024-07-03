import { Module } from '@nestjs/common';
import { BranchesController } from './branch.controller';
import { BranchService } from './branches.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { Order } from '../orders/entities/order.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Branch, Order]),
    ],
    controllers: [BranchesController],
    providers: [BranchService],
    exports: [TypeOrmModule],
})
export class BranchModule { }
