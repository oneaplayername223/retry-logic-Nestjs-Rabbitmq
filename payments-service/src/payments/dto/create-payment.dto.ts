import { Currency, PaymentStatus } from '@prisma/client';


export class Payment {
  id: string;
  productId: string;
  quantity: number;
  amount: number;
  currency: Currency;
  status: PaymentStatus;
}

export class CreatePaymentDto {
  id?: string;
  productId: string;
  quantity: number;
  amount: number;
  currency: Currency;
  status: PaymentStatus;
}