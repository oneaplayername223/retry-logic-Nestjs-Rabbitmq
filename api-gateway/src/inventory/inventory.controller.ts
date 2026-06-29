import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('inventory')
export class InventoryController {
  constructor(
    private readonly inventoryService: InventoryService
  ) {}

  @Post()
  create(@Body() createInventoryDto: CreateInventoryDto) {
    const exchangePayload = {
    exchange: 'inventory_exchange',
    routingKey: 'inventory.create',
    }
    return this.inventoryService.publishInventory(createInventoryDto, exchangePayload);
  }

  
}
