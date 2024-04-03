
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const log = (req: Request) => {
    console.log(`ip:${req.ip} calls path: ${req.path}`);
};

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        log(req)
        next();
    }
}

// global
export function logger(req: Request, res: Response, next: NextFunction) {
    log(req)
    next();
};