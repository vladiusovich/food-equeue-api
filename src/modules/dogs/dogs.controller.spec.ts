import { Test, TestingModule } from '@nestjs/testing';
import DogsController from './dogs.controller';
import { DogsService } from './dogs.service';

describe('AppController', () => {
  let appController: DogsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DogsController],
      providers: [DogsService],
    }).compile();

    appController = app.get<DogsController>(DogsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
