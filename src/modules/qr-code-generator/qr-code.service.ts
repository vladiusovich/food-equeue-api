import { Injectable } from '@nestjs/common';
import * as qrcode from 'qrcode';

@Injectable()
export class QrCodeService {
    async generateQrCode(data: string): Promise<string> {
        try {
            return await qrcode.toDataURL(data);
        } catch (error) {
            throw new Error('Failed to generate QR code.');
        }
    }
}
