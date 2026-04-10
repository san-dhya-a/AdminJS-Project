import { AppDataSource } from '../src/db/datasource.js';
import { Page } from '../src/entities/page.entity.js';

async function check() {
  try {
    await AppDataSource.initialize();
    const repo = AppDataSource.getRepository(Page);
    const page = await repo.findOneBy({ id: 4 });
    console.log('---PAGE START---');
    console.log(JSON.stringify(page, null, 2));
    console.log('---PAGE END---');
  } catch (err) {
    console.error(err);
  } finally {
    await AppDataSource.destroy();
  }
}

check();
