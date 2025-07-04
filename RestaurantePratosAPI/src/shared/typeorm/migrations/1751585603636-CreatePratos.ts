import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreatePratos1751507929896 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
                    new Table({
                        name: 'pratos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'nome',
            type: 'varchar',
          },
          {
            name: 'preco',
            type: 'decimal',
            precision: 5,
            scale: 2,
          },
          {
            name: 'tempo_preparacao',
            type: 'int',
          },
          {
            name: 'ingredientes',
            type: 'varchar',
          },
          {
            name: 'nota_prato',
            type: 'decimal',
            precision: 5,
            scale: 2,
          },
          {
            name: 'descricao',
            type: 'varchar',
          },
          {
            name: 'restauranteId', // 👈 Coluna da chave estrangeira
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'pratos',
      new TableForeignKey({
        columnNames: ['restauranteId'], // Coluna em `pratos`
        referencedTableName: 'restaurantes', // Tabela referenciada
        referencedColumnNames: ['id'], // Coluna em `restaurantes`
        onDelete: 'CASCADE', // Opcional: deleta pratos se o restaurante for removido
      }),
    );
  }

  
    public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('pratos');

    if (table) {
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.includes('restauranteId'),
        );

        if (foreignKey) {
            await queryRunner.dropForeignKey('pratos', foreignKey);
        }
    }

    await queryRunner.dropTable('pratos');
}


}
