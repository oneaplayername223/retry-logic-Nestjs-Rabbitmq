import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CartService } from './cart.service';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartProductDto } from './dto/cart-product.dto';

@Controller()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @MessagePattern('createCart')
  create(@Payload() createCartDto: CartProductDto) {
    console.log({productId: createCartDto.productId, 
      productQuantity: createCartDto.quantity});
    return this.cartService.create(createCartDto);
  }

  @MessagePattern('findCart')
  findAll() {
    return this.cartService.findAll();
  }

  @MessagePattern('findOneCart')
  findOne(@Payload() id: number) {
    return this.cartService.findOne(id);
  }

  @MessagePattern('updateCart')
  update(@Payload() updateCartDto: UpdateCartDto) {
    return this.cartService.update(updateCartDto.id, updateCartDto);
  }

  @MessagePattern('removeCart')
  remove(@Payload() id: number) {
    return this.cartService.remove(id);
  }
}
