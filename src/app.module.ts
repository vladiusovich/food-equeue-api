import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './modules/client/orders/orders.module';
import { LoggerModule } from 'src/configurations/logger.module';
import { SqLiteDbModule } from './configurations/db.module';
import { SeederModule } from 'src/modules/infrastructure/seeder/seeder.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { OrdersStaffModule } from 'src/modules/staff/staff-orders/staff-orders.module';
import { StaffProductsModule } from './modules/staff/staff-products/staff-products.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BranchModule } from './modules/branches/branches.module';
import { QCodeModule } from './modules/staff/qr-code-generator/qr-code.generator.module';
import { CustomersModule } from './modules/client/customers/customers.module';
import { EventsGatewayModule } from './modules/common/events.gateway/events.gateway.module';
import { OrderExecutionCalculatorModule } from './modules/common/order-execution-time-calculator/order-execution-calculator.module';
import { CustomerAuthModule } from './modules/client/customer-auth/customer-auth.module';
import configuration from './configurations/configuration';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env', '.env.development.local', '.env.development'],
            load: [configuration],
            isGlobal: true,
        }),
        ScheduleModule.forRoot(),
        EventEmitterModule.forRoot(), EventsGatewayModule,
        SqLiteDbModule, LoggerModule, OrdersModule,
        SeederModule, OrdersStaffModule, StaffProductsModule,
        OrderExecutionCalculatorModule,
        BranchModule, QCodeModule, CustomersModule,
        CustomerAuthModule,
    ],
})

export class AppModule { }
