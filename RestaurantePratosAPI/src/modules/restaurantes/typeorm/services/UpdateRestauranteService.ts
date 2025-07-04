import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Restaurante from "../entities/Restaurante";
import RestauranteRepository from "../repositories/RestauranteRepository";

interface IRequest{
    id: string;
    nome: string;
    capacidade_clientes: number;
    endereco: string;
    descricao: string;
    nota_restaurante: number
}

export default class UpdateRestauranteService{

    public async execute({id, nome, capacidade_clientes, endereco, descricao, nota_restaurante}: IRequest) : Promise<Restaurante>{
        const restauranteRepository = getCustomRepository(RestauranteRepository);
        const restaurante = await restauranteRepository.findOne(id);
        if(!restaurante){
            throw new AppError('Restaurante não encontrado.');
        }
        //verificar se o novo nome do produto tbm já não exite e que não é o mesmo
        const restauranteExists = await restauranteRepository.findByName(nome);
        if(restauranteExists && nome != restaurante.nome){
            throw new AppError('Já existe um restaurante com esse nome.');
        }
        restaurante.nome = nome;
        restaurante.capacidade_clientes = capacidade_clientes;
        restaurante.endereco = endereco;
        restaurante.descricao = descricao;
        restaurante.nota_restaurante = nota_restaurante

        await restauranteRepository.save(restaurante);

        return restaurante;
    }
}
