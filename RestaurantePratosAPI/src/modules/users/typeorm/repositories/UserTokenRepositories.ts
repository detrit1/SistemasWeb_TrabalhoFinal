import { EntityRepository, Repository } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import UserTokens from "../entities/UserTokens";

@EntityRepository(UserTokens)
export default class UserTokensReposistories extends Repository<UserTokens>{

    public async findByToken(token: string): Promise<UserTokens | undefined>{
        const userToken = await this.findOne({
            where: { 
                token 
            },
        });
        return userToken;
    }

    public async createToken(user_id: string): Promise<UserTokens>{
        const token = uuidv4();
        const userToken = this.create({ user_id, token });
        await this.save(userToken);
        return userToken;
    }

}