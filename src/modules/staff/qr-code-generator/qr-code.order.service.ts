import { Inject, Injectable } from '@nestjs/common';
import { QrCodeService } from './qr-code.service';
import { Order } from '../../client/orders/entities/order.entity';
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
        } else if (!order?.hash) {
            throw new Error('Order hash not found.');
        }

        const url = generateUrl(this.getHost(), order.hash);

        return await this.qrCodeService.generateQrCode(url);
    }

    // TODO: dynaic host resolver
    private getHost(): string {
        const isDev = this.configService.get<string>('IS_DEV', 'true');
        const isLocalDeploy = this.configService.get<string>('IS_LOCAL_NETWORK_DEPLOY', 'true');

        if (isDev === 'true' && isLocalDeploy === 'true') {
            return this.configService.get<string>('CLIENT_APP_LOCAL_NETWORK_URL')!;
        }

        const clientUrl = this.configService.get<string>('CLIENT_APP_URL');

        if (!clientUrl) {
            throw new Error('CLIENT_APP_URL is not defined.');
        }

        return clientUrl;
    }
}
