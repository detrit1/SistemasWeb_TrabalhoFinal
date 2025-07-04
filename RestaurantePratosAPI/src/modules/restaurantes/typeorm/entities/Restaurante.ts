import Prato from '../../../pratos/typeorm/entities/Prato';
import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
@Entity('restaurantes')
export default class Restaurante{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column() //faz automaticamente o mapeamento para varchar
    nome: string;
    @Column('int')
    capacidade_clientes: number;
    @Column()
    endereco: string;
    @Column()
    descricao: string;
    @Column('decimal')
    nota_restaurante: number;
    @OneToMany(() => Prato, (prato: Prato) => prato.restaurante)
    pratos: Prato[];
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}
