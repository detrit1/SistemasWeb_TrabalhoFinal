import { EntityRepository, Repository } from "typeorm";
import Prato from "../entities/Prato";

@EntityRepository(Prato)
export default class PratoRepository extends Repository<Prato>{

    //esse método retorna uma promessa
    public async findByName(nome: string): Promise<Prato | undefined>{
        const prato = this.findOne({
            where: { nome }
        })
        return prato;
    }
}
