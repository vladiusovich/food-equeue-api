import { Module } from '@nestjs/common';
import { OrdersModule } from '../orders/orders.module';
import { OrderExecutionCalculatorService } from './order-execution-calculator-service';
import { EventsGateway } from '../events.gateway/events.gateway';
import { TaskCalculatorService } from './task-calculator-service';

@Module({
    imports: [OrdersModule],
    providers: [OrderExecutionCalculatorService, EventsGateway,
        TaskCalculatorService,
    ],
})
export class OrderExecutionCalculatorModule { }
