require('dotenv').config()
const Pool = require('pg').Pool

const devConfig = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
}

const proConfig = {
    connectionString: process.env.DATABASE_URL
}

const pool = new Pool(process.env.NODE_ENV === 'production' ? proConfig : devConfig)

module.exports = pool