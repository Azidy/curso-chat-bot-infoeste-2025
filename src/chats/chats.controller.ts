import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { Request, Response } from 'express';
import { OpenAIService } from 'src/services/openai.service';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chats: ChatsService, private readonly openai: OpenAIService){}

  @Post('/mensagem')
  async enviarScript(@Req() req: Request, @Res() res: Response, @Body() payload) {
      const agente_resposta = await this.openai.client.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.7,
        messages: [
          {role: 'system',
            content: 'Voce é um agente de organizacao escola da escola Maria Aparecida Lopes, e voce trabalha na secretaria respondedo os pais e responsaveis dos alunos'
          },
          {role: 'user',
            content: payload.mensagem
          }
        ]
      })

      const resposta = agente_resposta.choices[0].message.content;
      return res.json({message: resposta});
    }
}
