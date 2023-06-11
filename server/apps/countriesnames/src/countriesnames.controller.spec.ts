import { Test, TestingModule } from '@nestjs/testing';
import { CountriesnamesController } from './countriesnames.controller';
import { CountriesnamesService } from './countriesnames.service';

describe('CountriesnamesController', () => {
  let countriesnamesController: CountriesnamesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CountriesnamesController],
      providers: [CountriesnamesService],
    }).compile();

    countriesnamesController = app.get<CountriesnamesController>(CountriesnamesController);
  });

});
