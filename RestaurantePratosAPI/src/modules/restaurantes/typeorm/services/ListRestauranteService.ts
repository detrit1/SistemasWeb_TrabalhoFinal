import { getCustomRepository } from "typeorm";
import Restaurante from "../entities/Restaurante";
import RestauranteRepository from "../repositories/RestauranteRepository";

export default class ListRestauranteService {
  public async execute(): Promise<Restaurante[]> {
    const restauranteRepository = getCustomRepository(RestauranteRepository);

    const restaurantes = await restauranteRepository.find({
      
    });

    return restaurantes;
  }
}
