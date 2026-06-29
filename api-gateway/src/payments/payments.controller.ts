import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ClientProxy } from '@nestjs/microservices/client/client-proxy';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService,) {}

  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    const exchangePayload = {
      routingKey: 'payment.created',
      exchange: 'payments_exchange',
    };
    await this.paymentsService.publishPayment(createPaymentDto, exchangePayload);
    return {payment: "payment successful"}
  }

  
}
