import { NestFactory } from '@nestjs/core';
import { AppModule } from './configurations/app.module';
// import { logger } from './middlewaries/logger.middleware';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // global
    // app.use(logger);

    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT', 3000);

    await app.listen(port);

    console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
