// jwt.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CustomerAuthService } from './customer-auth.service';
import { CustomerAuthStrategy } from './customer-auth.strategy';

@Module({
    imports: [
        JwtModule.register({
            secret: 'your-secret-key', // Replace with your secret key
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [CustomerAuthService, CustomerAuthStrategy],
    exports: [CustomerAuthService],
})

export class CustomerAuthModule { }