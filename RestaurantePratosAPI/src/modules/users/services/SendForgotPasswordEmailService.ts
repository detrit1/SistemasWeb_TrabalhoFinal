import { getCustomRepository } from "typeorm";
import UserTokensReposistories from "../typeorm/repositories/UserTokenRepositories";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import EtherealMail from "@config/mail/EtherealMail";
import path from "path";

interface IRequest{
    email: string;
}

export default class SendForgotPasswordEmailService{
    public async execute ({email}: IRequest): Promise<void>{
        
        const userRepository = getCustomRepository(UsersRepository);
        const userTokensReposistories = getCustomRepository(UserTokensReposistories);
        const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');
        const user = await userRepository.findByEmail(email);
        if(!user){
            throw new AppError('User does not exist.');
        }
        console.log("service");
        const {token} = await userTokensReposistories.createToken(user.id);

        // implementação do envio do token
        console.log(token);
        await EtherealMail.sendMail({
            to: {
                name: user.name, 
                email: user.email
            },
            subject: '[API Vendas] Recuperação de Senha',
            templateData:{
                file: forgotPasswordTemplate,
                variables:{
                    name: user.name,
                    link: `http://localhost:3333/reset_password?token=${token}`
                }
            }
        })
    }
}