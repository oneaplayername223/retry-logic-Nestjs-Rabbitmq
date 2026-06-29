// payments.service.ts
import * as amqp from 'amqplib';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  async publishPayment(dto: any, exchangePayload: any) {
    const conn = await amqp.connect(process.env.RABBIT_URL ?? 'amqp://localhost:5672');
    const channel = await conn.createChannel();

    const { exchange, routingKey } = exchangePayload;

 channel.publish(
  exchange,
  routingKey,
  Buffer.from(JSON.stringify({
    pattern: routingKey,
    data: dto,
  })),
  {
    headers: { pattern: routingKey },
  },
);



    await channel.close();
    await conn.close();
  }
}
