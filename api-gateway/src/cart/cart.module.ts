import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [
      ClientsModule.register([
        {
          name: 'CART_SERVICE',
          transport: Transport.RMQ,
          options: {
            urls: [process.env.RABBIT_URL ?? 'amqp://localhost:5672'],
            queue: 'cart',
            queueOptions: {
              durable: true,
            },
          },
          
        },
      ]),
  ]
})
export class CartModule {}
