// jwt.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class CustomerAuthService {
    constructor(private readonly jwtService: NestJwtService) { }

    generateToken(payload: any): string {
        return this.jwtService.sign(payload);
    }
}
