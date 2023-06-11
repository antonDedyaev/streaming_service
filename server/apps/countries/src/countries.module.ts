import { Module } from '@nestjs/common';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CountriesOfFilms } from './counties.model';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./apps/countries/.${process.env.NODE_ENV}.env`,
      isGlobal:true
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [CountriesOfFilms],
      autoLoadModels: true
    }),
    SequelizeModule.forFeature([CountriesOfFilms]),
  ],
  controllers: [CountriesController],
  providers: [CountriesService,
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
    },
    {
      provide: 'COUNTRIESNAMES_SERVICE',
        useFactory:(configService:ConfigService)=> {
          const USER = configService.get('RABBITMQ_DEFAULT_USER');
          const PASSWORD =  configService.get('RABBITMQ_DEFAULT_PASS');
          const HOST = configService.get('RABBITMQ_HOST');
          const QUEUE = configService.get('RABBITMQ_COUNTRIESNAMES_QUEUE');
    
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
export class CountriesModule {}
