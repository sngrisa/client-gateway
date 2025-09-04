import { OrderStatus } from "src/orders/dto/orders.enum.dto";
import { PaginationDto } from "./pagination.dto";
import { IsEnum, IsOptional } from "class-validator";
import { OrderStatusList } from '../../orders/dto/orders.enum.dto';

export class PaginationOrderDto extends PaginationDto {

    @IsEnum(OrderStatusList, {
        message: `Possible Values Are ${OrderStatusList}`
    })
    @IsOptional()
    status?: OrderStatus;

}