import { AppDataSource } from './src/db/datasource.js';

async function checkCols() {
  await AppDataSource.initialize();
  const queryRunner = AppDataSource.createQueryRunner();
  const cols = await queryRunner.getTable('user_has_roles');
  console.log(JSON.stringify(cols?.columns.map(c => c.name), null, 2));
  await AppDataSource.destroy();
}

checkCols().catch(console.error);
