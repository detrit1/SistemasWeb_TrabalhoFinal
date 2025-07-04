import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import { getCustomRepository } from "typeorm";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import auth from "@config/auth";
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface IRequest{
    email: string;
    password: string;
}

interface IResponse{
    user: User;
    token: string;
}

export default class CreateSessionService{
    public async execute({email, password} : IRequest) : Promise<IResponse>{
        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findByEmail(email);
        if(!user){
            throw new AppError('Incorrect Email/password combination.')
        }

        const passwordConfirmed = await compare(password, user.password);
        if(!passwordConfirmed){
            throw new AppError('A senha está incorreta');
        }

        const token = sign({}, auth.jwt.secret, {
            subject: user.id,
            expiresIn: '1d'
        })


        return {user, token};
    }
}