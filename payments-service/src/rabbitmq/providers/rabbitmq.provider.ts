import { Provider } from '@nestjs/common';
import * as amqp from 'amqplib';

export const RabbitMQChannelProvider: Provider = {
  provide: 'RABBITMQ_CHANNEL',
  useFactory: async () => {
    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();

    return channel;
  },
};