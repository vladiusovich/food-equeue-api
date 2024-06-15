import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CatsModule } from '../modules/cats/cats.module';
import { DogsModule } from '../modules/dogs/dogs.module';
import { LoggerModule } from 'src/configurations/logger.module';
import { SqLiteDbModule } from './db.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env', '.env.development.local', '.env.development'],
            // load: [configuration],
            isGlobal: true,
        })
        , SqLiteDbModule, LoggerModule, CatsModule, DogsModule],
})

export class AppModule { }
