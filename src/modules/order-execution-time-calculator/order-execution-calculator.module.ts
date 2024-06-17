import { Module } from '@nestjs/common';
import { OrderExecutionCalculatorService } from './order-execution-calculator.service';
import { OrdersModule } from '../orders/orders.module';

@Module({
    imports: [OrdersModule],
    providers: [OrderExecutionCalculatorService],
})
export class OrderExecutionCalculatorModule { }
