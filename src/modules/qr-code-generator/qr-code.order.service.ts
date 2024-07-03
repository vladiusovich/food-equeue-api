import { Inject, Injectable } from '@nestjs/common';
import { QrCodeService } from './qr-code.service';
import { Order } from '../orders/entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { generateUrl } from './utility/url.generator';
import { ConfigService } from '@nestjs/config';
import * as os from 'os';

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
        } else if (!order?.hash) {
            throw new Error('Order hash not found.');
        }

        const url = generateUrl(this.getHost(), order.hash);

        return await this.qrCodeService.generateQrCode(url);
    }

    // TODO: dynaic host resolver
    private getHost(): string {
        const isDev = this.configService.get<boolean>('IS_DEV', true);
        const isLocalDeploy = this.configService.get<boolean>('IS_LOCAL_DEPLOY', true);

        if (isDev && isLocalDeploy) {
            return this.getLocalIp() + ':3005';
        }

        const clientUrl = this.configService.get<string>('CLIENT_APP_URL', 'http://localhost:3000');

        return clientUrl;
    }

    getLocalIp(): string {
        const interfaces = os.networkInterfaces();

        for (const name in interfaces) {
            if (interfaces.hasOwnProperty(name)) {
                for (const iface of interfaces[name]!) {
                    if (iface.family === 'IPv4' && !iface.internal) {
                        return iface.address;
                    }
                }
            }
        }

        return '127.0.0.1'; // Default fallback
    }
}
