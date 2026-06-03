const { neon } = require('@neondatabase/serverless');

async function createTable() {
  const sql = neon(process.env.DATABASE_URL);
  await sql`CREATE TABLE IF NOT EXISTS montano_media (id SERIAL PRIMARY KEY, url TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
  console.log('Tabla creada');
}

createTable();
