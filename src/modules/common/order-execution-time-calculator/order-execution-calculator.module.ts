import { Module } from '@nestjs/common';
import { OrderExecutionCalculatorService } from './order-execution-calculator-service';
import { EventsGateway } from '../events.gateway/events.gateway';
import { TaskCalculatorService } from './task-calculator-service';
import { OrdersModule } from 'src/modules/client/orders/orders.module';

@Module({
    imports: [OrdersModule],
    providers: [OrderExecutionCalculatorService, EventsGateway,
        TaskCalculatorService,
    ],
})
export class OrderExecutionCalculatorModule { }
