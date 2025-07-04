import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import RestauranteRepository from "../repositories/RestauranteRepository";

interface IRequest{
    id: string;
}

export default class DeleteRestauranteService{

    public async execute({id}: IRequest) : Promise<void>{
        const restaurantesRepository = getCustomRepository(RestauranteRepository);
        const restaurante = await restaurantesRepository.findOne(id);
        if(!restaurante){
            throw new AppError('restaurante não encontrado.');
        }
        await restaurantesRepository.remove(restaurante); 
    }
}
