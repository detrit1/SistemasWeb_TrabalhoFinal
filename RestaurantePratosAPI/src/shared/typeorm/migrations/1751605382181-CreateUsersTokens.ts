import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersTokens1750787155936 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.createTable(
                    new Table({
                        name: 'users_tokens',
                        columns: [
                            {name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()'},
                            {name: 'token', type: 'uuid'},
                            {name: 'user_id', type: 'uuid'},
                            {name: 'created_at', type: 'timestamp', default: 'now()'},
                            {name: 'updated_at', type: 'timestamp', default: 'now()'},
                        ],
                        foreignKeys:[{
                            name: 'TokenUsers',
                            referencedTableName: 'users',
                            referencedColumnNames: ['id'],
                            columnNames: ['user_id'],
                            onDelete: 'CASCADE',
                            onUpdate: 'CASCADE'
                        }]
                    })
                );
            }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users_tokens');
    }

}
