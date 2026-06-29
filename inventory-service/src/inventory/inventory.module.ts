import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { PrismaModule } from '../prisma/prisma.module';

dotenv.config();

@Module({
  controllers: [InventoryController],
  providers: [InventoryService],
  imports: [PrismaModule,
    ClientsModule.register([
      {
        name: 'CART_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL ?? 'amqp://guest:guest@rabbitmq:5672'],
          queue: 'cart',
        },
      },
    ])
  ]
  
})
export class InventoryModule {}
