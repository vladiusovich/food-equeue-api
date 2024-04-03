import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from '../modules/cats/entities/cat.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db.sqlite',
            entities: [Cat],
            synchronize: true, //shouldn't be used in production - otherwise you can lose production data.
        }),
    ],
})
export class SqLiteDbModule { }
