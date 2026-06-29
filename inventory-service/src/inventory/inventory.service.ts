import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InventoryService {
  constructor(@Inject('CART_SERVICE') private readonly cartService: ClientProxy,
private readonly prismaService: PrismaService) {}
  async create(createInventoryDto: CreateInventoryDto) {
    const {name, price, status, quantity} = createInventoryDto

    try {
      await this.prismaService.$transaction(async (tx) => {
  const product = await tx.product.create({
    data: { name, price, status },
  });

  const inventory = await tx.inventory.create({
    data: {
      quantity,
      productId: product.id,
    },
  });

  return { product, inventory };
});
    } catch (error) {
      console.error(error);
      return error;
    }
   

  
  
  //firstValueFrom(this.cartService.emit('checkoutCart', {productId: inventoryQuery.productId, quantity: inventoryQuery.quantity}));
   
    return `Product: ${name},
    ${quantity} units added to inventory`;
  }

  async  checkout(checkoutInventoryDto: any) {
    const {id, productId, quantity} = checkoutInventoryDto
    const checkQuantity = await this.prismaService.inventory.findUnique({
      where: {
        productId
      }
    })
    console.log(checkQuantity?.quantity
    );
    if(checkQuantity!.quantity < quantity || checkQuantity?.quantity === 0) {
      console.error('Not enough quantity');
      
      throw new NotFoundException('Not enough quantity')
    }
    await this.prismaService.inventory.update({
      where: {
        productId
      },
      data: {
        quantity: {
          decrement: quantity
        }
      }
    })
    firstValueFrom(this.cartService.emit('checkoutCart', {productId, quantity}));
    return `This action returns all inventory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inventory`;
  }

  update(id: number, updateInventoryDto: UpdateInventoryDto) {
    return `This action updates a #${id} inventory`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventory`;
  }
}
