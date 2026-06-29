import { IsNumber } from "class-validator";

export class CartProductDto {
    @IsNumber()
    productId: string;
    @IsNumber()
    quantity: number;
}