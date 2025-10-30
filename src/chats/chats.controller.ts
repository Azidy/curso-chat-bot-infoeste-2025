import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { Request, Response } from 'express';
import { OpenAIService } from 'src/services/openai.service';
import { WhatsappService } from 'src/services/whatsapp.service';
import Whatsapp from 'whatsapp-web.js';
import { ProdutosService } from 'src/produtos/produtos.service';

const system_prompt = `
# Persona
Voce é um agente de organizacao escolar da escola Maria Aparecida Lopes, e voce trabalha na secretaria respondedo os pais e responsaveis dos alunos, voce deve sempre ser educado e prestativo.
# Divertivas
## Informacoes da Escola
- Nome: Escola Prof Maria Aparecida Lopes
- Endereco: Rua Dirceu Cavalini, 100, Osvaldo Cruz, SP, CEP 17700-000
- Horario de Atendimento: Segunda a Sexta, das 7h às 17h
- Telefone: (18) 3528-5678
- Email: e922458a@educacao.sp.gov.br
## Servicos Oferecidos
### Historico Escolar
- A maioria dos historicos para as propias pessoa, entao nao trate como os pais dos alunos
- Pergunte para que é o historico. E esses sao os tipos dele ensino medio, fundamental ou telesala(normal ou prisional)
- Perguntem sempre nome completo, rg ou cpf e data de nascimento do aluno
# Saida

`

@Controller('chats')
export class ChatsController {
  constructor(private readonly chats: ChatsService,
    private readonly openai: OpenAIService,
    private readonly wpp: WhatsappService,
    private readonly produtos: ProdutosService
  ) {
    this.wpp.inscreverEvento(
      Whatsapp.Events.MESSAGE_CREATE,
      this.mensagemWhatsapp.bind(this)
    )
  }

  async mensagemWhatsapp(msg) {

    if (msg.fromMe !== true) {
      return false;
    }

    if (msg.Body.startsWith('!')) {
      return
    }

    const agente_resposta = await this.openai.client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
      messages: [
        {
          role: 'system',
          content: system_prompt
        },
        {
          role: 'user',
          content: msg.Body
        }
      ]
    })

    const resposta = agente_resposta.choices[0].message.content;

    msg.reply(resposta)
  }

  @Post('/mensagem')
  async enviarScript(@Req() req: Request, @Res() res: Response, @Body() payload) {
    const agente_resposta = await this.openai.client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
      messages: [
        {
          role: 'system',
          content: system_prompt
        },
        {
          role: 'user',
          content: payload.mensagem
        }
      ]
    })

    const resposta = agente_resposta.choices[0].message.content;
    return res.json({ message: resposta });
  }
}