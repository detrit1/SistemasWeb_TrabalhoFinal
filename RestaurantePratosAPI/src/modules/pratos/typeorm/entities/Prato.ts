import Restaurante from '../../../restaurantes/typeorm/entities/Restaurante';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn, 
  UpdateDateColumn ,
  JoinColumn
} from 'typeorm';

@Entity('pratos')
export default class Prato {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    nome: string;
    @Column('decimal', { 
        precision: 5, 
        scale: 2,
        transformer: {
            to: (value: number) => value,
            from: (value: string) => parseFloat(value)
        }
    })
    preco: number;
    @Column('int')
    tempo_preparacao: number; //em minutos
    @Column()
    ingredientes: string;
    @Column('decimal', {
        precision: 3,
        scale: 2,
        default: 0.00,
        transformer: {
            to: (value: number) => {
                if (value < 0 || value > 10) {
                    throw new Error('A nota deve estar entre 0.00 e 10.00');
                }
                return value;
            },
            from: (value: string) => parseFloat(value)
        }
    })
    nota_prato: number;
    @Column()
    descricao: string;
    @ManyToOne(() => Restaurante, (restaurante: Restaurante) => restaurante.pratos)
    @JoinColumn({ name: 'restauranteId' })
    restaurante: Restaurante;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}
