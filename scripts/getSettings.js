const { neon } = require('@neondatabase/serverless');

async function getSettings() {
  const sql = neon(process.env.DATABASE_URL);
  const rows = await sql`SELECT * FROM montano_settings`;
  console.log(rows);
}

getSettings();
