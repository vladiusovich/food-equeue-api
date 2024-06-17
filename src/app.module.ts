import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './modules/orders/orders.module';
import { LoggerModule } from 'src/configurations/logger.module';
import { SqLiteDbModule } from './configurations/db.module';
import { SeederModule } from 'src/modules/seeder/seeder.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventsGatewayModule } from 'src/modules/events.gateway/events.gateway.module';
import { OrdersStaffModule } from 'src/modules/staff-orders/staff-orders.module';
import { StaffProductsModule } from './modules/staff-products/staff-products.module';
import { OrderExecutionCalculatorModule } from './modules/order-execution-time-calculator/order-execution-calculator.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env', '.env.development.local', '.env.development'],
            // load: [configuration],
            isGlobal: true,
        }),
        EventEmitterModule.forRoot(), EventsGatewayModule,
        SqLiteDbModule, LoggerModule, OrdersModule,
        SeederModule, OrdersStaffModule, StaffProductsModule,
        OrderExecutionCalculatorModule,
    ],
})

export class AppModule { }
