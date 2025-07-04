import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import { getCustomRepository } from "typeorm";

export default class ListUserService{
    public async execute() : Promise<User[]>{
        const userRepository = getCustomRepository(UsersRepository);
        const users = await userRepository.find();
        return users;
    }
}