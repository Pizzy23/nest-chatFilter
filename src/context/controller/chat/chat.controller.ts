import { Headers, Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilterService } from 'src/context/service/filter.service';

@ApiTags('Chat')
@Controller('/chat')
export class EmailController {
  constructor(private service: FilterService) {}
  @ApiOperation({
    summary: '',
    description: '',
  })
  @Get('/')
  async getSuport(@Headers() offensife: boolean) {
    return await this.service.getUser(offensife);
  }
}
