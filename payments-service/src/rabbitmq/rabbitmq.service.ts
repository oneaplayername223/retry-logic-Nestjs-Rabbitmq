import type { Channel } from 'amqplib';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RabbitmqService {
  constructor(@Inject('RABBITMQ_CHANNEL')private readonly channel: Channel) {}

  async publish(
    exchange: string,
    routingKey: string,
    payload: unknown,
    headers: Record<string, any> = {},
  ) {
    this.channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(payload)),
      {
        persistent: true,
        headers,
      },
    );
  }
}