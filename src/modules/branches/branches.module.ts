import { Module } from '@nestjs/common';
import { BranchesController } from './branch.controller';
import { BranchService } from './branches.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Branch]),
    ],
    controllers: [BranchesController],
    providers: [BranchService],
    exports: [TypeOrmModule],
})
export class BranchModule { }
