import { Module } from '@nestjs/common';
import DogsController from 'src/modules/dogs/dogs.controller';
import { DogsService } from 'src/modules/dogs/dogs.service';

@Module({
    controllers: [DogsController],
    providers: [DogsService],
})

export class DogsModule { }