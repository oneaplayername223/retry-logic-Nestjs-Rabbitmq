import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { ClientsModule } from '@nestjs/microservices/module/clients.module';
import { Transport } from '@nestjs/microservices/enums/transport.enum';
import { PaymentsService } from './payments.service';
@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
 
})
export class PaymentsModule {}
