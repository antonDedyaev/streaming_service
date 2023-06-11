import { Test, TestingModule } from '@nestjs/testing';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';

describe('GenresController', () => {
  let genresController: GenresController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GenresController],
      providers: [GenresService],
    }).compile();

    genresController = app.get<GenresController>(GenresController);
  });

  
});
