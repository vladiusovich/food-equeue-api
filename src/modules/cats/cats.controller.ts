import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CatsService } from 'src/modules/cats/cats.service';
import { ConfigService } from '@nestjs/config';
import { Cat } from './entities/cat.entity';


@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService, private configService: ConfigService) { }

    @Get('')
    async getAll(): Promise<Cat[]> {
        // get an environment variable
        const dbUser = this.configService.get<string>('DATABASE_USER');

        // get a custom configuration value
        const dbHost = this.configService.get<string>('DATABASE_PASSWORD');

        console.log(dbUser, dbHost);

        return await this.catsService.all();
    }

    @Get(':name')
    async findByName(@Param('name') name: string): Promise<Cat | null> {
        return await this.catsService.findByName(name);
    }

    @Post()
    async create(@Body() cat: Cat) {
        return await this.catsService.create(cat);
    }
}
