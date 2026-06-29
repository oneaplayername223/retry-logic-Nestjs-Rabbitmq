import { Module } from '@nestjs/common';

import { PaymentsModule } from './payments/payments.module';
import { PrismaModule } from './prisma/prisma.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';


@Module({
  imports: [PaymentsModule, PrismaModule, RabbitmqModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
