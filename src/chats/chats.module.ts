import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { OpenAIService } from 'src/services/openai.service';

@Module({
  controllers: [ChatsController],
  providers: [ChatsService, OpenAIService],
})
export class ChatsModule {}
