import { Module } from '@nestjs/common';
import { CatsModule } from '../modules/cats/cats.module';
import { DogsModule } from '../modules/dogs/dogs.module';
import { ConfigModule } from '@nestjs/config';
import { SqLiteDbModule } from './db.module';
import { LoggerModule } from 'src/configurations/logger.module';

@Module({
    imports: [ConfigModule.forRoot({
        envFilePath: ['.env', '.env.development.local', '.env.development'],
        // load: [configuration],
        isGlobal: true,
    }), ConfigModule, LoggerModule, SqLiteDbModule, CatsModule, DogsModule],
})

export class AppModule { }
