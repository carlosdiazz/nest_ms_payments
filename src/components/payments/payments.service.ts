import { Request, Response } from 'express';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import Stripe from 'stripe';

//Propio
import { envs, NAME_NATS_SERVICE } from 'src/config';
import { PaymentSessionDto } from './dto/payment-dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(envs.STRIPE_SECRET);

  constructor(
    @Inject(NAME_NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  public async createPaymentSesion(paymentSessionDto: PaymentSessionDto) {
    const { currency, items, orderId } = paymentSessionDto;

    const lineItems = items.map((item) => {
      return {
        price_data: {
          currency: currency,
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

    const session = await this.stripe.checkout.sessions.create({
      //Colocar aqui el id de mi orden
      payment_intent_data: {
        metadata: {
          orderId,
        },
      },

      // Es un arreglo donde se colcoan los items que estan comprando
      line_items: lineItems,
      mode: 'payment',
      success_url: envs.STRIPE_SUCCESS_URL,
      cancel_url: envs.STRIPE_CANCEL_URL,
    });
    //return session;
    return {
      cancelUrl: session.cancel_url,
      successUrl: session.success_url,
      url: session.url,
    };
  }

  public webhook(req: Request, res: Response) {
    const sig = req.headers['stripe-signature'] ?? '';

    let event: Stripe.Event;

    const endpointSecret = envs.STRIPE_ENDPOINT_SECRET;
    try {
      event = this.stripe.webhooks.constructEvent(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        req['rawBody'],
        sig,
        endpointSecret,
      );
    } catch (err) {
      console.log(`Error => webhook `);
      //console.log(err);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      res.status(400).send({ message: `Webhook Error: ${err.message}` });
      return;
    }

    console.log(event.type);

    switch (event.type) {
      case 'charge.succeeded': {
        const chargeSucceeded = event.data.object;
        const payload = {
          stripePayment: chargeSucceeded.id,
          orderId: chargeSucceeded.metadata.orderId,
          receiptUrl: chargeSucceeded.receipt_url,
        };
        this.client.emit('payment.succeeded', payload);
        break;
      }

      default:
        //break;
        console.log(`Event: ${event.type} not handled`);
    }

    return res.status(200).json({ sig });
  }

  public success() {
    return true;
  }

  public cancel() {
    return true;
  }
}
