import { Injectable } from '@nestjs/common';
import { offensife } from '../mock/filter.mock';
import { ChatInput } from 'src/view/interface/chat.interface';
import { ChatEntity } from '../entity/chat.entity';
@Injectable()
export class FilterService {
  constructor(private readonly repo: ChatEntity) {}
  async filter(msg: ChatInput) {
    const msgLower = msg.msg.toLocaleLowerCase();
    if (await this.detecter(msgLower)) {
      this.repo.putOffensiveUserInDb(msg);
      return true;
    }
    this.repo.putNotOffensiveUserInDb(msg);
    return false;
  }
  async getUser(off: boolean) {
    if (off == true) {
      return await this.repo.getAllOffensives();
    }
    return await this.repo.getAllNotOffensives();
  }
  async detecter(msgLower) {
    for (const word of offensife) {
      const pattern = new RegExp(`\\b${word}\\b`, 'i');
      if (pattern.test(msgLower)) {
        return true;
      }
    }
    return false;
  }
}
