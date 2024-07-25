import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { logger } from './middlewaries/logger.middleware';
import { ConfigService } from '@nestjs/config';
import { SeederService } from './modules/infrastructure/seeder/seeder.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // global
    // app.use(logger);

    const seederService = app.get(SeederService);
    const configService = app.get(ConfigService);

    const isDevelopment = configService.get<boolean>('IS_DEV', false);
    await seederService.seed(isDevelopment);

    const port = configService.get<number>('PORT', 3000);

    app.enableCors();

    await app.listen(port);

    console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
