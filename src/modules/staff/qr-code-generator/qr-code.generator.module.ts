import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../../client/orders/entities/order.entity';
import { QrCodeService } from './qr-code.service';
import { QrCodeOrderService } from './qr-code.order.service';
import { QrCodeOrderController } from './qr-code.order.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order, ConfigModule]),
    ],
    controllers: [QrCodeOrderController],
    providers: [QrCodeService, QrCodeOrderService],
})

export class QCodeModule { }
