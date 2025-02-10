import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  healthCheck() {
    return {
      error: false,
      message: 'Payments is up',
      status_code: 200,
    };
  }
}
