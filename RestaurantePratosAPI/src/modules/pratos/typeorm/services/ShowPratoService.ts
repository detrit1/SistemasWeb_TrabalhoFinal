import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import PratoRepository from "../repositories/PratoRepository";
import Prato from "../entities/Prato";

interface IRequest{
    id: string;
}

export default class ShowPratoService{

    public async execute({id}: IRequest) : Promise<Prato>{
        const pratoRepository = getCustomRepository(PratoRepository);
        const prato = await pratoRepository.findOne(id);
        if(!prato){
            throw new AppError('Prato não encontrado.');
        }
        return prato;
    }
}

