import { Module } from '@nestjs/common';

import { GateWayModule } from './context/chat/gateway.module';
import { PrismaService } from './config';
import { ChatEntity } from './context/entity/chat.entity';
import { FilterService } from './context/service/filter.service';
import { DateManipulator } from './util/date';

@Module({
  imports: [GateWayModule],
  controllers: [],
  providers: [FilterService, PrismaService, ChatEntity,DateManipulator],
})
export class AppModule {}
