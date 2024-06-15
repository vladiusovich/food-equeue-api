import { Inject, Injectable } from '@nestjs/common';
import { Cat } from './entities/cat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class CatsService {
    constructor(
        @InjectRepository(Cat)
        private catsRepository: Repository<Cat>,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) { }

    all(): Promise<Cat[]> {
        return this.catsRepository.find();
    }

    findOne(id: number): Promise<Cat | null> {
        return this.catsRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.catsRepository.delete(id);
    }

    findByName(name: string): Promise<Cat | null> {
        return this.catsRepository.findOneBy({ name });
    }

    async create(cat: Cat): Promise<Cat> {
        const c = await this.catsRepository.save(cat);

        return c;
    }
}
