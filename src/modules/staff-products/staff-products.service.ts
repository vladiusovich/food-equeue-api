import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Product } from '../orders/entities/product.entity';
import CreateProdactRequest from './models/requesties/create-product.request';

@Injectable()
export class StaffProductsService {

    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,

        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger,
    ) { }


    async getProducts(): Promise<Product[]> {
        const products = await this.productsRepository.find();

        return products;
    }

    async create(product: CreateProdactRequest): Promise<Product> {
        try {
            return await this.productsRepository.save({ ...product });
        } catch (error) {
            this.logger.error(`Failed to create product: ${error.message}`);
            throw new Error(`Product creation failed: ${error.message}`);
        }
    }
}
