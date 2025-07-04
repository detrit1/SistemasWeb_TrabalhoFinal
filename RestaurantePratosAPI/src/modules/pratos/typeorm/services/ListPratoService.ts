import { getCustomRepository } from "typeorm";
import Prato from "../entities/Prato";
import PratoRepository from "../repositories/PratoRepository";

export default class ListPratoService{

    public async execute() : Promise<Prato[]>{
        const pratoRepository = getCustomRepository(PratoRepository);
        const prato = await pratoRepository.find({
            relations: ['restaurante'] // Carrega a relação com restaurante
        });
        return prato;
    }
}
