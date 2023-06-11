import { Test, TestingModule } from '@nestjs/testing';
import { GenresnamesController } from './genresnames.controller';
import { GenresnamesService } from './genresnames.service';

describe('GenresnamesController', () => {
  let genresnamesController: GenresnamesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GenresnamesController],
      providers: [GenresnamesService],
    }).compile();

    genresnamesController = app.get<GenresnamesController>(GenresnamesController);
  });

  
});
