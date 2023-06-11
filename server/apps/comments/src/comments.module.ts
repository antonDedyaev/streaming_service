import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Comment } from './comments.model';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';


@Module({
    imports: [ConfigModule.forRoot({
        envFilePath: `./apps/comments/.${process.env.NODE_ENV}.env`,
        isGlobal:true
      }),
      SequelizeModule.forRoot({
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        models: [Comment],
        autoLoadModels: true
      }), SequelizeModule.forFeature([Comment])],
    controllers: [CommentsController],
    providers: [CommentsService,
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
    ]
})
export class CommentsModule {
}