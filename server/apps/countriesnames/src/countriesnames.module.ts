import { Module } from '@nestjs/common';
import { CountriesnamesController } from './countriesnames.controller';
import { CountriesnamesService } from './countriesnames.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CountriesNames } from './countries-names.model';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./apps/countriesnames/.${process.env.NODE_ENV}.env`,
      isGlobal:true
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [CountriesNames],
      autoLoadModels: true
    }),
    SequelizeModule.forFeature([CountriesNames]),
  ],
  controllers: [CountriesnamesController],
  providers: [CountriesnamesService,
    {
      provide: 'FILM_SERVICE',
        useFactory:(configService:ConfigService)=> {
          const USER = configService.get('RABBITMQ_DEFAULT_USER');
          const PASSWORD =  configService.get('RABBITMQ_DEFAULT_PASS');
          const HOST = configService.get('RABBITMQ_HOST');
          const QUEUE = configService.get('RABBITMQ_FILM_QUEUE');
    
          return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
              urls:[`amqp://${USER}:${PASSWORD}@${HOST}`],
              noAck:false,
              queue: QUEUE,
              queueOptions: {
                durable: true
              }
            }
          })
        },
        inject:[ConfigService]
    }
  ],
})
export class CountriesnamesModule {}
