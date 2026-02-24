require('dotenv').config()
const db = require('./config/db')

async function test() {
  const [rows] = await db.query('SELECT NOW() as now')
  console.log(rows)
  process.exit()
}

test()