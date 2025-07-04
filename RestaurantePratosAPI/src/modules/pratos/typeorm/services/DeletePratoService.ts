import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import PratoRepository from "../repositories/PratoRepository";

interface IRequest{
    id: string;
}

export default class DeletePratoService{

    public async execute({id}: IRequest) : Promise<void>{
        const pratoRepository = getCustomRepository(PratoRepository);
        const prato = await pratoRepository.findOne(id);
        if(!prato){
            throw new AppError('restaurante não encontrado.');
        }
        await pratoRepository.remove(prato); 
    }
}
