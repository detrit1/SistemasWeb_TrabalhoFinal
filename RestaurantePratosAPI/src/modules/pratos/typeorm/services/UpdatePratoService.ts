import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import PratoRepository from "../repositories/PratoRepository";
import Prato from "../entities/Prato";
import Restaurante from "@modules/restaurantes/typeorm/entities/Restaurante";

interface IRequest{
    id: string;
    nome: string;
    preco: number;
    tempo_preparacao: number;
    ingredientes: string;
    nota_prato: number;
    descricao: string;
}

export default class UpdatePratoService{

    public async execute({id, nome, preco, tempo_preparacao, ingredientes, nota_prato, descricao}: IRequest) : Promise<Prato>{
        const pratoRepository = getCustomRepository(PratoRepository);
        const prato = await pratoRepository.findOne(id);
        if(!prato){
            throw new AppError('Prato não encontrado.');
        }
        //verificar se o novo nome do produto tbm já não exite e que não é o mesmo
        const pratoExists = await pratoRepository.findByName(nome);
        if(pratoExists && nome != prato.nome){
            throw new AppError('Já existe um prato com esse nome.');
        }
        prato.nome = nome;
        prato.preco = preco;
        prato.tempo_preparacao = tempo_preparacao;
        prato.ingredientes = ingredientes;
        prato.nota_prato = nota_prato;
        prato.descricao = descricao;

        await pratoRepository.save(prato);

        return prato;
    }
}
