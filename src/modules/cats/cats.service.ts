import { Injectable } from '@nestjs/common';
import { Cat } from './entities/cat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CatsService {
    constructor(
        @InjectRepository(Cat)
        private catsRepository: Repository<Cat>,
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

    create(cat: Cat): Promise<Cat> {
        return this.catsRepository.save(cat);
    }
}
