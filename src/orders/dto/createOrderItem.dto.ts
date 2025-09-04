import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class CreateOrderItemDto {

    @IsNumber() @Type(() => Number)
    @IsPositive()
    @Min(0)
    productId: number;

    @Type(() => Number)
    @IsPositive()
    @Min(0)
    quantity: number;

    @Type(() => Number)
    @IsPositive()
    @IsOptional()
    @Min(0)
    price?: number;
}