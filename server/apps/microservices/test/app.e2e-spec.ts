import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Inject } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ClientProxy } from '@nestjs/microservices';

describe('AppController (e2e)', () => {
  
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it('get-title',async ()=>{
    await request(app.getHttpServer)
    .get('/title_users')
    .expect(200)

  })
});
