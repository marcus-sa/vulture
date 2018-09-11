import { Get, Controller } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getInfo() {
    return 'Is working!';
  }
}
