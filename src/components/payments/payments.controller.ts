import { Controller, Get, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { responseInterface } from 'src/common';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-payment-session')
  private async createPaymentSesion(): Promise<responseInterface> {
    return {
      message: 'create-payment-session',
      statusCode: 200,
    };
  }

  @Post('webhook')
  private async webhook(): Promise<responseInterface> {
    return {
      message: 'webhook',
      statusCode: 200,
    };
  }

  @Get('success')
  private async success(): Promise<responseInterface> {
    return {
      message: 'success',
      statusCode: 200,
    };
  }

  @Get('cancel')
  private async cancel(): Promise<responseInterface> {
    return {
      message: 'cancel',
      statusCode: 200,
    };
  }
}
