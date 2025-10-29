import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { Request, Response } from 'express';

interface Produto {
  id: string;
  nome: string;
  preco: number;
  descricao: string;
}

const produtos: Produto[] = [];

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtos: ProdutosService) {}

  @Get('/lista')
  listaProdutos(@Req() req: Request, @Res() res: Response) {
    return res.json({items: produtos});
  }

  @Post('/')
  criarProdutos(@Req() req: Request, @Res() res: Response, @Body() payload: Produto) {
    produtos.push(payload);
    return res.json({success: true, message: 'Produto criado com sucesso!'});
  }
}