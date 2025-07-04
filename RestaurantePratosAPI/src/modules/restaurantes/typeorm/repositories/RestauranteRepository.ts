import { EntityRepository, Repository } from "typeorm";
import Restaurante from "../entities/Restaurante";

@EntityRepository(Restaurante)
export default class RestauranteRepository extends Repository<Restaurante>{

    //esse método retorna uma promessa
    public async findByName(nome: string): Promise<Restaurante | undefined>{
        const restaurante = this.findOne({
            where: { nome }
        })
        return restaurante;
    }

    public async findByIdWithPratos(id: string): Promise<Restaurante | undefined> {
        return this.createQueryBuilder('restaurante')
            .leftJoinAndSelect('restaurante.pratos', 'pratos')
            .where('restaurante.id = :id', { id })
            .getOne();
    }
}
