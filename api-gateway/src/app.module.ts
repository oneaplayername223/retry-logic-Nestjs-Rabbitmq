import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentsModule } from './payments/payments.module';
import { InventoryModule } from './inventory/inventory.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [PaymentsModule, InventoryModule, CartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
