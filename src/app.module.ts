import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutosModule } from './produtos/produtos.module';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [ProdutosModule, ChatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
