import { Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { RabbitmqController } from './rabbitmq.controller';
import { RabbitMQChannelProvider } from './providers/rabbitmq.provider';

@Module({
  controllers: [RabbitmqController],
  providers: [RabbitmqService, RabbitMQChannelProvider],
  exports: [RabbitmqService],
})
export class RabbitmqModule {}
