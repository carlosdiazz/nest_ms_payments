import { Request, Response } from 'express';
import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentsService } from './payments.service';
import { PaymentSessionDto } from './dto/payment-dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  //@Post('create-payment-session')
  @MessagePattern('create.payment.session')
  private async createPaymentSesion(
    @Payload() paymentSessionDto: PaymentSessionDto,
  ) {
    return this.paymentsService.createPaymentSesion(paymentSessionDto);
  }

  @Post('webhook')
  private webhook(@Req() req: Request, @Res() res: Response) {
    console.log('Entro a webhook');
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
