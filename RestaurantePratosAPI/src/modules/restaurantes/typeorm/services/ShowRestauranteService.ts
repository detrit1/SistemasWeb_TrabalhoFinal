import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Restaurante from "../entities/Restaurante";
import RestauranteRepository from "../repositories/RestauranteRepository";

interface IRequest{
    id: string;
}

export default class ShowRestaurenteService{

    public async execute({id}: IRequest) : Promise<Restaurante>{
        const restauranteRepository = getCustomRepository(RestauranteRepository);
        const restaurante = await restauranteRepository.findOne(id, {
      relations: ['pratos'], // <-- Aqui está a inclusão dos pratos
    });
        if(!restaurante){
            throw new AppError('Restaurante não encontrado.');
        }
        return restaurante;
    }
}

