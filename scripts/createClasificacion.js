const { neon } = require('@neondatabase/serverless');

async function setup() {
  const sql = neon(process.env.DATABASE_URL);
  
  await sql`
    CREATE TABLE IF NOT EXISTS montano_categories (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL UNIQUE
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS montano_brands (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL UNIQUE
    )
  `;

  // Insertar datos por defecto si no existen
  try {
    await sql`INSERT INTO montano_categories (name) VALUES ('Jamones'), ('Ahumados'), ('Fiambres'), ('Especialidades') ON CONFLICT DO NOTHING`;
    await sql`INSERT INTO montano_brands (name) VALUES ('Montano Antilia'), ('Vicosa'), ('Don Vincenzo'), ('Delium') ON CONFLICT DO NOTHING`;
  } catch(e) {
    console.log(e);
  }

  console.log("Tablas creadas");
}

setup();
