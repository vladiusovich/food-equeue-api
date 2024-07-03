import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';
import { QrCodeService } from './qr-code.service';
import { QrCodeOrderService } from './qr-code.order.service';
import { QrCodeOrderController } from './qr-code.order.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order]),
    ],
    controllers: [QrCodeOrderController],
    providers: [QrCodeService, QrCodeOrderService],
})

export class QCodeModule { }
