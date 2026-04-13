import mysql from 'mysql2/promise';

async function createTable() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mareeswari',
    database: 'Login_system',
  });

  try {
    console.log('Creating home_banners table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS home_banners (
        id INT AUTO_INCREMENT PRIMARY KEY,
        image LONGTEXT,
        link VARCHAR(255),
        start_date DATE,
        end_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Table home_banners created successfully.');
  } catch (error) {
    console.error('Error creating table:', error);
  } finally {
    await connection.end();
  }
}

createTable();
