import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

@EventPattern('payment.created')
async create(
  @Payload() dto: CreatePaymentDto,
  @Ctx() context: RmqContext,
) {
  const channel = context.getChannelRef();
  const message = context.getMessage();

  const headers = message.properties.headers ?? {};
  const retryCount = headers['x-retry-count'] ?? 0;
  const maxRetries = 3;

  console.log(`processing payment - ${retryCount + 1}`);

  try {
    await this.paymentsService.create(dto);
    
    console.log('✅ Payment processed successfully');

    channel.ack(message);
  } catch (error) {
    console.error('❌ Error processing payment', error);

    if (retryCount >= maxRetries) {
      console.log('max retries reached, sending to DLQ...');

      channel.publish(
        'payments_dlq_exchange',
        'payment.dlq',
        message.content,
        {
          persistent: true,
          headers,
        },
      );

      channel.ack(message);
      return;
    }

    // Backoff
    const delay = 5000 * Math.pow(2, retryCount);

    console.log(
      `🔄 retrying on ${delay / 1000} seconds (retry ${
        retryCount + 1
      }/${maxRetries})`,
    );

    channel.publish(
      'payments_exchange',
      'payment.created',
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



  @MessagePattern('payment.retry')
  findAll() {
  return console.log('retry')
  }

  @MessagePattern('findOnePayment')
  findOne(@Payload() id: number) {
    return this.paymentsService.findOne(id);
  }

  @MessagePattern('updatePayment')
  update(@Payload() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(updatePaymentDto.id, updatePaymentDto);
  }

  @MessagePattern('removePayment')
  remove(@Payload() id: number) {
    return this.paymentsService.remove(id);
  }
}
