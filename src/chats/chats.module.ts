import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { OpenAIService } from 'src/services/openai.service';
import { WhatsappService } from 'src/services/whatsapp.service';
import { ProdutosModule } from 'src/produtos/produtos.module';


@Module({
  imports: [ProdutosModule],
  controllers: [ChatsController],
  providers: [ChatsService, OpenAIService, WhatsappService],
})
export class ChatsModule {}
