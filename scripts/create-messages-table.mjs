import { neon } from '@neondatabase/serverless';

async function init() {
  if (!process.env.DATABASE_URL) {
    console.error('No DATABASE_URL found');
    process.exit(1);
  }
  const sql = neon(process.env.DATABASE_URL);
  
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS mensajes_contacto (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        whatsapp VARCHAR(255),
        mensaje TEXT NOT NULL,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        leido BOOLEAN DEFAULT false
      );
    `;
    await sql`ALTER TABLE mensajes_contacto ADD COLUMN IF NOT EXISTS whatsapp VARCHAR(255);`;
    console.log('Table mensajes_contacto created successfully!');
  } catch (err) {
    console.error('Error creating table:', err);
  }
}

init();
