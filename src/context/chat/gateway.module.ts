import { Module } from '@nestjs/common';
import { MessageGateway } from './chat.gate';
import { PrismaService } from 'src/config';
import { ChatEntity } from '../entity/chat.entity';
import { FilterService } from '../service/filter.service';
import { DateManipulator } from 'src/util/date';

@Module({
  imports: [],
  controllers: [],
  providers: [MessageGateway, FilterService, PrismaService, ChatEntity,DateManipulator],
})
export class GateWayModule {}
