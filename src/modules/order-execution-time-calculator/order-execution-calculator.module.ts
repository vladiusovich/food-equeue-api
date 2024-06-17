import { Module } from '@nestjs/common';
import { OrdersModule } from '../orders/orders.module';
import { OrderExecutionCalculatorService } from './order-execution-calculator-servece';
import { OrderCreatedListener } from './listeners/order-created.listener';
import { EventsGateway } from '../events.gateway/events.gateway';

@Module({
    imports: [OrdersModule],
    providers: [OrderExecutionCalculatorService, EventsGateway, OrderCreatedListener],
})
export class OrderExecutionCalculatorModule { }
