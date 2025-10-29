import { IsString, IsNumber } from 'class-validator';

export class CriarProdutoDto {
    @IsString()
    id: string;

    @IsString()
    nome: string;

    @IsNumber()
    preco: number;

    @IsString()
    descricao: string;
}