import { Controller, Get, Inject, ParseIntPipe, Query } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { QrCodeOrderService } from './qr-code.order.service';

@Controller('staff/orders/qr-code')
export class QrCodeOrderController {
    constructor(
        private readonly qrCodeOrderService: QrCodeOrderService,

        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger) { }

    @Get('')
    async getQrCode(@Query('orderId', ParseIntPipe) orderId: number) {
        const qrCodeDataURL = await this.qrCodeOrderService.generateQrCode(orderId);

        return `<img src="${qrCodeDataURL}" alt="QR Code" />`;
    }
}
