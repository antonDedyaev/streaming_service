import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cors from 'cors'
async function bootstrap() {
  
  const app = await NestFactory.create(AppModule,{cors:true});
  


  const PORT = process.env.PORT 
  const config = new DocumentBuilder()
        .setTitle('Данные с сайта kinopoisk')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .build()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document)
  await app.listen(PORT, ()=>console.log(`Server started on port = ${PORT}`)) 
}
bootstrap();
