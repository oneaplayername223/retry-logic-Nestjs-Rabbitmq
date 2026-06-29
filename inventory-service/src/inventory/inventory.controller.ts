import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Controller()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService,
  ) {}
  //trabajar con esto

  @MessagePattern('inventory.create')
async create(@Payload() createInventoryDto: any, @Ctx() context: RmqContext) {
  const channel = context.getChannelRef();
  const message = context.getMessage();

  const headers = message.properties.headers ?? {};
  const retryCount = headers['x-retry-count'] ?? 0;
  const maxRetries = 3;

  console.log(`PROCESSING INVENTORY: ${retryCount + 1}`);

  try {
    await this.inventoryService.create(createInventoryDto);
    console.log('📦 product added successfuly');
    channel.ack(message);
  } catch (error) {
    if (retryCount >= maxRetries) {
      console.log('❌ Max retries reached, sending to DLQ...');
      channel.publish(
        'dlx_exchange',
        'retry',
        message.content,
        {
          headers: { pattern: 'inventory.create' },
          persistent: true,
        },
      );
      channel.ack(message);
      return;
    }

    // Backoff
    const delay = 5000 * Math.pow(2, retryCount);
    console.log(`🔄 retrying on ${delay / 1000}s (retry ${retryCount + 1}/${maxRetries})`);

   channel.publish(
  'inventory_exchange',
  'inventory.create',
  message.content,
  {
    persistent: true,
    headers: {
      ...headers,
      'x-delay': delay, 
      'x-retry-count': retryCount + 1,
    },
  },
);


    channel.ack(message);
  }
}





  @MessagePattern('inventory.checkout')
  checkout(@Payload() checkoutInventoryDto: any) {
    console.log(checkoutInventoryDto);
    return this.inventoryService.checkout(checkoutInventoryDto);
  }

  @MessagePattern('findOneInventory')
  findOne(@Payload() id: number) {
    return this.inventoryService.findOne(id);
  }

  @MessagePattern('updateInventory')
  update(@Payload() updateInventoryDto: UpdateInventoryDto) {
    return this.inventoryService.update(updateInventoryDto.id, updateInventoryDto);
  }

  @MessagePattern('removeInventory')
  remove(@Payload() id: number) {
    return this.inventoryService.remove(id);
  }
}
