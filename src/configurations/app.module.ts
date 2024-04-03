import { Module } from '@nestjs/common';
import { CatsModule } from '../modules/cats/cats.module';
import { DogsModule } from '../modules/dogs/dogs.module';
import { ConfigModule } from '@nestjs/config';
import { SqLiteDbModule } from './db.module';

@Module({
    imports: [ConfigModule.forRoot({
        envFilePath: ['.env', '.env.development.local', '.env.development'],
        // load: [configuration],
        isGlobal: true,
    }), ConfigModule, SqLiteDbModule, CatsModule, DogsModule],
})

export class AppModule { }
