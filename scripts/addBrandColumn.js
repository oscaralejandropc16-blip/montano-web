const { neon } = require('@neondatabase/serverless');

async function addBrand() {
  const sql = neon(process.env.DATABASE_URL);
  try {
    await sql`ALTER TABLE montano_products ADD COLUMN brand TEXT DEFAULT 'Montano Antilia'`;
    console.log("Columna 'brand' añadida exitosamente.");
  } catch (error) {
    console.log("La columna probablemente ya existe:", error.message);
  }
}

addBrand();
