import { Controller, Get } from '@nestjs/common';

@Controller('app')
export class AppController {
  @Get('health-check')
  healthCheck() {
    return {
      error: false,
      message: 'Payments is up',
      status_code: 200,
    };
  }
}
