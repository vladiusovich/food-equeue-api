import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from 'src/modules/cats/cats.service';
import { Cat } from './entities/cat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Cat])],
    controllers: [CatsController],
    providers: [CatsService],
    exports: [TypeOrmModule],
})

export class CatsModule { }