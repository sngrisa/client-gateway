import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  controllers: [OrdersController],
  imports: [
    NatsModule
  ]
})
export class OrdersModule { }
