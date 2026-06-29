enum PaymentMethod {
    CREDIT_CARD = 'credit_card',
    PAYPAL = 'paypal',
    BANK_TRANSFER = 'bank_transfer',
    CRYPTOCURRENCY = 'cryptocurrency',
}

enum Currency {
   DOP = 'DOP',
   USD = 'USD',
}

export class CreatePaymentDto {
    productId: number;
    paymentMethod: PaymentMethod = PaymentMethod.CREDIT_CARD;
    amount: number;
    currency: Currency = Currency.USD;
    description?: string;
    quantity?: number = 1;
}
