import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentSessionDto } from './dto/payment-dto';
import { Request, Response } from 'express';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-payment-session')
  private async createPaymentSesion(
    @Body() paymentSessionDto: PaymentSessionDto,
  ) {
    return this.paymentsService.createPaymentSesion(paymentSessionDto);
  }

  @Post('webhook')
  private webhook(@Req() req: Request, @Res() res: Response) {
    return this.paymentsService.webhook(req, res);
  }

  @Get('success')
  private success() {
    return this.paymentsService.success();
  }

  @Get('cancel')
  private cancel() {
    return this.paymentsService.cancel();
  }
}
