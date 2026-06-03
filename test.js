const { neon } = require('@neondatabase/serverless');

async function run() {
  const sql = neon('postgresql://neondb_owner:npg_awjz6AHWosg9@ep-wild-wind-ape01wjm.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require');
  const res = await sql`SELECT * FROM montano_products`;
  console.log(res);
}
run();
