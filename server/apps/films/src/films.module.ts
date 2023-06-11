import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Films } from '../../films/src/films.model';
import { FilmsService } from './films.service';
import { JwtModule } from '@nestjs/jwt';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./apps/films/.${process.env.NODE_ENV}.env`,
      isGlobal:true
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Films],
      autoLoadModels: true
    }),
    SequelizeModule.forFeature([Films]),
  ],
  controllers: [FilmsController],
  providers: [FilmsService,
    {
      provide: 'PERSONS_SERVICE',
        useFactory:(configService:ConfigService)=> {
          const USER = configService.get('RABBITMQ_DEFAULT_USER');
          const PASSWORD =  configService.get('RABBITMQ_DEFAULT_PASS');
          const HOST = configService.get('RABBITMQ_HOST');
          const QUEUE = configService.get('RABBITMQ_PERSONS_QUEUE');
    
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
      provide: 'GENRES_SERVICE',
        useFactory:(configService:ConfigService)=> {
          const USER = configService.get('RABBITMQ_DEFAULT_USER');
          const PASSWORD =  configService.get('RABBITMQ_DEFAULT_PASS');
          const HOST = configService.get('RABBITMQ_HOST');
          const QUEUE = configService.get('RABBITMQ_GENRES_QUEUE');
    
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
      provide: 'NAMESOFGENRES_SERVICE',
        useFactory:(configService:ConfigService)=> {
          const USER = configService.get('RABBITMQ_DEFAULT_USER');
          const PASSWORD =  configService.get('RABBITMQ_DEFAULT_PASS');
          const HOST = configService.get('RABBITMQ_HOST');
          const QUEUE = configService.get('RABBITMQ_GENRESNAMES_QUEUE');
    
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
      provide: 'COUNTRIES_SERVICE',
        useFactory:(configService:ConfigService)=> {
          const USER = configService.get('RABBITMQ_DEFAULT_USER');
          const PASSWORD =  configService.get('RABBITMQ_DEFAULT_PASS');
          const HOST = configService.get('RABBITMQ_HOST');
          const QUEUE = configService.get('RABBITMQ_COUNTRIES_QUEUE');
    
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
    },
    {
      provide: 'VIDEOS_SERVICE',
        useFactory:(configService:ConfigService)=> {
          const USER = configService.get('RABBITMQ_DEFAULT_USER');
          const PASSWORD =  configService.get('RABBITMQ_DEFAULT_PASS');
          const HOST = configService.get('RABBITMQ_HOST');
          const QUEUE = configService.get('RABBITMQ_VIDEOS_QUEUE');
    
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
      provide: 'COMMENT_SERVICE',
        useFactory:(configService:ConfigService)=> {
          const USER = configService.get('RABBITMQ_DEFAULT_USER');
          const PASSWORD =  configService.get('RABBITMQ_DEFAULT_PASS');
          const HOST = configService.get('RABBITMQ_HOST');
          const QUEUE = configService.get('RABBITMQ_COMMENT_QUEUE');
    
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
export class FilmsModule {}