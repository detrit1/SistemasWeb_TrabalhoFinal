import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateRestaurantes1751256743000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'restaurantes',
                columns: [
                    {name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()'},
                    {name: 'nome', type: 'varchar'},
                    {name: 'capacidade_clientes', type: 'int'},
                    {name: 'endereco', type: 'varchar'},
                    {name: 'descricao', type: 'varchar'},
                    {name: 'nota_restaurante', type: 'decimal', precision: 10, scale: 2},
                    {name: 'created_at', type: 'timestamp', default: 'now()'},
                    {name: 'updated_at', type: 'timestamp', default: 'now()'}
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('restaurantes');
    }
}
