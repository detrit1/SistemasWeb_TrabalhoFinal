import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import RestauranteRepository from "../repositories/RestauranteRepository";
import Restaurante from "../entities/Restaurante";

interface IRequest{
    nome: string;
    capacidade_clientes: number;
    endereco: string;
    descricao: string;
    nota_restaurante: number
}

export default class CreateRestauranteService{

    public async execute({nome, capacidade_clientes, endereco, descricao, nota_restaurante}: IRequest) : Promise<Restaurante>{
        const restauranteRepository = getCustomRepository(RestauranteRepository);
        
        //para criar um produto, não podemos ter um outro produto com o mesmo nome
        const restauranteExists = await restauranteRepository.findByName(nome);
        if(restauranteExists){
            throw new AppError('There is already one restaurante with this name.');
        }

        const restaurante = restauranteRepository.create({
            nome, capacidade_clientes, endereco, descricao, nota_restaurante
        });
        await restauranteRepository.save(restaurante);
        return restaurante;
    }
}
