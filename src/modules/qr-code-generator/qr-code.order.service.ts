import { Inject, Injectable } from '@nestjs/common';
import { QrCodeService } from './qr-code.service';
import { Order } from '../orders/entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { generateUrl } from './utility/url.generator';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QrCodeOrderService {
    constructor(
        @Inject(QrCodeService)
        private readonly qrCodeService: QrCodeService,
        @Inject(ConfigService)
        private readonly configService: ConfigService,
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
    ) { }

    async generateQrCode(id: number): Promise<string> {
        const order = await this.ordersRepository.findOne({
            where: { id },
        });

        if (!order) {
            throw new Error('Order not found.');
        } else if (!order.hash) {
            throw new Error('Order hash not found.');
        }

        const data = generateUrl(this.getHost(), order.hash);

        return await this.qrCodeService.generateQrCode(data);
    }

    // TODO: dynaic host resolver
    private getHost(): string {
        const clientUrl = this.configService.get<string>('CLIENT_APP_URL', 'http://localhost:3002');

        return clientUrl;
    }
}
