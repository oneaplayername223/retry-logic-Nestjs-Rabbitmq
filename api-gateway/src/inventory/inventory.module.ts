import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  controllers: [InventoryController],
  providers: [InventoryService],
  
})
export class InventoryModule {}
