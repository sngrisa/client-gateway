import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Inject, Query, ParseUUIDPipe } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { catchError } from 'rxjs';
import { PaginationOrderDto } from 'src/common/dto/paginationOrder.dto';

@Controller('orders')
export class OrdersController {

  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy
  ) { }


  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send('createOrder', { ...createOrderDto }).pipe(catchError((err: any) => { throw new RpcException(err) }));
  }

  @Get()
  findAll(@Query() queryParams?: PaginationOrderDto) {
    return this.client.send('findAllOrders', { queryParams }).pipe(catchError((err: any) => { throw new RpcException(err) }));;
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('findOneOrder', id).pipe(catchError((err: any) => { throw new RpcException(err) }));
  }

  @Get('status/:status')
  findAllByStatus(@Param('status') status: string) {
    const statusNumber = parseInt(status, 10);

    if (![0, 1, 2].includes(statusNumber)) {
      throw new RpcException('Estado inválido, solo se permiten 0,1,2');
    }

    return this.client
      .send('findAllByStatus', { status: statusNumber })
      .pipe(
        catchError((err: any) => { throw new RpcException(err) })
      );
  }

  @Patch(':id')
  changeStatusOrder(@Param('id', ParseUUIDPipe) id: string, @Body() { status }: PaginationOrderDto) {
    return this.client.send('updateOrderStatus', { id, status }).pipe(catchError((err) => { throw new RpcException(err) }));
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('removeOrder', id).pipe(catchError((err: any) => { throw new RpcException(err) }));;
  }

}
