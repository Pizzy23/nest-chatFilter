import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config';
import { DateManipulator } from 'src/util/date';
import { ChatInput } from 'src/view/interface/chat.interface';
@Injectable()
export class ChatEntity {
  constructor(
    private prisma: PrismaService,
    private readonly date: DateManipulator,
  ) {}
  async putOffensiveUserInDb(msg: ChatInput) {
    await this.prisma.msg.create({
      data: {
        uuid: msg.uuid,
        msg: msg.msg,
        isOffensive: true,
        SendIn: this.date.YMDHMS(),
      },
    });
  }

  async putNotOffensiveUserInDb(msg: ChatInput) {
    await this.prisma.msg.create({
      data: {
        uuid: msg.uuid,
        msg: msg.msg,
        isOffensive: false,
        SendIn: this.date.YMDHMS(),
      },
    });
  }
  async getAllOffensives() {
    return await this.prisma.msg.findMany({
      where: {
        isOffensive: true,
      },
    });
  }
  async getAllNotOffensives() {
    return await this.prisma.msg.findMany({
      where: {
        isOffensive: false,
      },
    });
  }
  async getAllMsg() {
    return await this.prisma.msg.findMany();
  }
}
