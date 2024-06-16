import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from '../modules/orders/orders.module';
import { LoggerModule } from 'src/configurations/logger.module';
import { SqLiteDbModule } from './db.module';
import { SeederModule } from 'src/modules/seeder/seeder.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env', '.env.development.local', '.env.development'],
            // load: [configuration],
            isGlobal: true,
        })
        ,SqLiteDbModule, LoggerModule, OrdersModule, SeederModule],
})

export class AppModule { }
