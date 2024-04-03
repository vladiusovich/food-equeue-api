import { Controller, Get } from '@nestjs/common';
import { DogsService } from './dogs.service';

@Controller("dogs")
export default class DogsController {
  constructor(private readonly appService: DogsService) { }

  @Get("hi")
  getHello(): string {
    return this.appService.getHello();
  }
}
