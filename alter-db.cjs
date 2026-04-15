const mysql = require('mysql2/promise');

async function alterDb() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'mareeswari',
      database: 'Login_system'
    });
    await connection.execute("ALTER TABLE timeline MODIFY COLUMN image LONGTEXT;");
    console.log("Column image converted to LONGTEXT successfully.");
    process.exit(0);
  } catch(e) {
    console.error("Error:", e.message);
    process.exit(1);
  }
}
alterDb();
