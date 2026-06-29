import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices/enums/transport.enum';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, 
    {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: 'inventory_queue',
      noAck: false,
      queueOptions: {
        durable: true,
        arguments: {
          'x-dead-letter-exchange': 'inventory_retry_exchange',
          'x-dead-letter-routing-key': 'inventory.retry',
          
        },
      },
    },
  });
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  await app.listen();
}

bootstrap();
