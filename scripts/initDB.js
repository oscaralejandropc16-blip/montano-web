const { neon } = require('@neondatabase/serverless');

async function init() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is missing');
  const sql = neon(process.env.DATABASE_URL);

  console.log('Creando tablas...');

  await sql`
    CREATE TABLE IF NOT EXISTS montano_products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      tag VARCHAR(100),
      description TEXT,
      ingredients TEXT,
      preservation TEXT,
      image_url TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS montano_settings (
      key VARCHAR(50) PRIMARY KEY,
      value TEXT
    )
  `;

  // Insertar valores por defecto si está vacío
  const products = await sql`SELECT COUNT(*) FROM montano_products`;
  if (products[0].count === '0') {
    console.log('Insertando datos de prueba...');
    await sql`
      INSERT INTO montano_products (name, category, tag, description, ingredients, preservation) VALUES
      ('Jamón Cocido Superior', 'Jamones', 'Cilindro 3,8 Kg', 'Elaborado con cortes magros seleccionados...', 'Pierna de cerdo, agua, sal', 'Refrigerado 0°C - 4°C'),
      ('Jamón Ahumado Tipo Tender', 'Ahumados', 'Pieza Entera', 'Sabor intenso con ahumado natural...', 'Carne de cerdo, humo', 'Refrigerado 0°C - 4°C')
    `;
  }

  const settings = await sql`SELECT COUNT(*) FROM montano_settings`;
  if (settings[0].count === '0') {
    await sql`
      INSERT INTO montano_settings (key, value) VALUES
      ('hero_video_url', '/hero-video.mp4')
    `;
  }

  console.log('¡Base de datos lista!');
}

init().catch(console.error);
