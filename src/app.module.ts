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
import { ScheduleModule } from '@nestjs/schedule';
import { BranchModule } from './modules/branches/branches.module';
import { QCodeModule } from './modules/qr-code-generator/qr-code.generator.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env', '.env.development.local', '.env.development'],
            // load: [configuration],
            isGlobal: true,
        }),
        ScheduleModule.forRoot(),
        EventEmitterModule.forRoot(), EventsGatewayModule,
        SqLiteDbModule, LoggerModule, OrdersModule,
        SeederModule, OrdersStaffModule, StaffProductsModule,
        OrderExecutionCalculatorModule,
        BranchModule, QCodeModule,
    ],
})

export class AppModule { }
