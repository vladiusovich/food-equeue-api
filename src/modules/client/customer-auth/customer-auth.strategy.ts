// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';

@Injectable()
export class CustomerAuthStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true, // TODO: Set this to false in production
            secretOrKey: jwtConstants.secret, // TODO: Replace with your secret key
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
    }
}
