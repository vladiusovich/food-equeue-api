import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Product } from '../orders/entities/product.entity';
import CreateProductRequest from './models/requesties/create-product.request';
import FindProductRequest from './models/requesties/find-product.request';
import UpdateProductRequest from './models/requesties/update-product.request';

@Injectable()
export class StaffProductsService {

    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,

        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger,
    ) { }


    async find(request: FindProductRequest): Promise<Product[]> {
        const products = await this.productsRepository.find({
            where: {
                id: request.id,
                name: request.name,
            },
        });

        return products ?? [];
    }

    async getProducts(): Promise<Product[]> {
        const products = await this.productsRepository.find();

        return products;
    }

    async create(product: CreateProductRequest): Promise<Product> {
        try {
            return await this.productsRepository.save({ ...product });
        } catch (error) {
            this.logger.error(`Failed to create product: ${error.message}`);
            throw new Error(`Product creation failed: ${error.message}`);
        }
    }

    async update(product: UpdateProductRequest): Promise<Product> {
        try {
            const toUpdate = await this.productsRepository.findOneBy({
                id: product.id,
            });

            const updatedProduct = await this.productsRepository.save({ ...toUpdate, ...product });

            return updatedProduct;
        } catch (error) {
            this.logger.error(`Failed to create order: ${error.message}`);
            throw new Error(`Order creation failed: ${error.message}`);
        }
    }
}
