import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { OrdersModule } from '../orders/orders.module';

@Module({
    imports: [OrdersModule],
    providers: [SeederService],
})

export class SeederModule { }
