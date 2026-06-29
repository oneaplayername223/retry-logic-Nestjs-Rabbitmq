import { Inject, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CartProductDto } from './dto/cart-product.dto';
import { Prisma } from '@prisma/client';

@Injectable()

export class CartService {
    constructor(private prismaService: PrismaService) {}

  async create(createCartDto: CartProductDto) {
   

    try {
       const {productId, quantity} = createCartDto
    const cartQuery = await this.prismaService.cart.create({
      data: {
        productId,
        quantity
      }
    })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new Error('Product already in cart');
      }
    }
  }


  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
