import { AppDataSource } from './src/db/datasource.js';
import { UserHasRoles } from './src/entities/user-has-roles.entity.js';

async function verify() {
  await AppDataSource.initialize();
  console.log('--- Checking UserHasRoles ---');
  const records = await UserHasRoles.find();
  console.log('Total records:', records.length);
  if (records.length > 0) {
    console.log('Sample record:', JSON.stringify(records[0], null, 2));
    console.log('User relation populated?', !!records[0].user);
    console.log('Role relation populated?', !!records[0].role);
  }
  
  const tables = await AppDataSource.query("SHOW TABLES");
  console.log('Tables in DB:', JSON.stringify(tables, null, 2));
  
  const columns = await AppDataSource.query("DESCRIBE user_has_roles");
  console.log('Columns in user_has_roles:', JSON.stringify(columns, null, 2));

  await AppDataSource.destroy();
}

verify().catch(console.error);
