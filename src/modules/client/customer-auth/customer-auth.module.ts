// jwt.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CustomerAuthService } from './customer-auth.service';
import { CustomerAuthStrategy } from './customer-auth.strategy';
import { CustomerAuthController } from './customer.auth.controller';
import { CustomerAuthGuard } from './customer-auth-gurd';

@Module({
    imports: [
        JwtModule.register({
            secret: 'your-secret-key', // Replace with your secret key
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [CustomerAuthController],
    providers: [
        CustomerAuthGuard,
        CustomerAuthService,
        CustomerAuthStrategy,
    ],
    exports: [CustomerAuthService, CustomerAuthGuard, JwtModule],
})

export class CustomerAuthModule { }
