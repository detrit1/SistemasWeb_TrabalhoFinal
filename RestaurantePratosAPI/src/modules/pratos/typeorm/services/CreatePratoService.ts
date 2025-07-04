import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import PratoRepository from "../repositories/PratoRepository";
import Prato from "../entities/Prato";
import Restaurante from "@modules/restaurantes/typeorm/entities/Restaurante";
import RestauranteRepository from "@modules/restaurantes/typeorm/repositories/RestauranteRepository";

interface IRequest{
    nome: string;
    preco: number;
    tempo_preparacao: number;
    ingredientes: string;
    nota_prato: number;
    descricao: string;
    restauranteId: string
}

export default class CreatePratoService{

    public async execute({nome, preco, tempo_preparacao, ingredientes, nota_prato, descricao, restauranteId
    }: IRequest) : Promise<Prato>{
        const pratoRepository = getCustomRepository(PratoRepository);
        const restauranteRepository = getCustomRepository(RestauranteRepository);
        //para criar um produto, não podemos ter um outro produto com o mesmo nome
        const pratoExists = await pratoRepository.findByName(nome);
        if(pratoExists){
            throw new AppError('Já existe um preto com esse nome.');
        }
        const restaurante = await restauranteRepository.findOne(restauranteId);
        if(!restaurante) {
            throw new AppError('Restaurante não encontrado.');
        }
        const prato = pratoRepository.create({
            nome, preco, tempo_preparacao, ingredientes, nota_prato, descricao, restaurante
        });
        if (nota_prato && (nota_prato < 0 || nota_prato > 10)) {
            throw new AppError('A nota do prato deve estar entre 0.00 e 10.00');
        }
        await pratoRepository.save(prato);
        return prato;
    }
}
