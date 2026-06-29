import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService, private rabbitmqService: RabbitmqService) {}
async create(createPaymentDto: CreatePaymentDto) {
  console.log(createPaymentDto);

  const { productId, quantity, amount, currency, status } = createPaymentDto;

  try {


    await this.prisma.payment.create({
      data: {
        quantity,
        productId,
        amount,
        currency,
        status,
      },
    });

    await this.rabbitmqService.publish(
  'inventory_exchange',
  'inventory.checkout',
  {
    pattern: 'inventory.checkout',
    data: {
      productId,
      quantity,
    },
  },
);


    return {
      message: 'Payment created successfully',
  }
  } catch (error) {
    throw new NotAcceptableException(error);
  }
}


  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
