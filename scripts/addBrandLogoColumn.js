const { neon } = require('@neondatabase/serverless');

async function run() {
  const sql = neon('postgresql://neondb_owner:npg_awjz6AHWosg9@ep-wild-wind-ape01wjm.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require');
  try {
    await sql`ALTER TABLE montano_brands ADD COLUMN logo_url TEXT;`;
    console.log("Column logo_url added to montano_brands successfully.");
  } catch (e) {
    console.error("Error or column already exists:", e.message);
  }
}
run();
