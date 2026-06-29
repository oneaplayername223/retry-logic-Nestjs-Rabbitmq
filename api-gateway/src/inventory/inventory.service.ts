import { Injectable } from '@nestjs/common';

import * as amqp from 'amqplib';
@Injectable()
export class InventoryService {
  async publishInventory(createInventoryDto: any, exchangePayload: any) {
      const conn = await amqp.connect(process.env.RABBIT_URL ?? 'amqp://localhost:5672');
      const channel = await conn.createChannel();
  
      const { exchange, routingKey } = exchangePayload;
      console.log(exchange, routingKey);
   channel.publish(
    exchange,
    routingKey,
    Buffer.from(JSON.stringify({
      pattern: routingKey,
      data: createInventoryDto,
    })),
    {
      headers: { pattern: routingKey },
    },
  );
  
  
  
      await channel.close();
      await conn.close();
    }
}
