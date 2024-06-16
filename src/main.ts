import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { logger } from './middlewaries/logger.middleware';
import { ConfigService } from '@nestjs/config';
import { SeederService } from './modules/seeder/seeder.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // global
    // app.use(logger);

    const seederService = app.get(SeederService);
    const configService = app.get(ConfigService);

    const isDevelopment = configService.get<boolean>('IS_DEV', false);
    await seederService.seed(isDevelopment);

    const port = configService.get<number>('PORT', 3000);

    await app.listen(port);

    console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
