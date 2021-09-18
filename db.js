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
pool.connect((err, client, done) => {
    console.log(process.env.NODE_ENV)
    console.log(process.env.DATABASE_URL)
    if (err) {
        console.log('HI ERROR!!!!')
        console.log(err)
    } else {
        console.log('success')
    }
})

module.exports = pool

postgres://jnjegafsefclsr:5c8193ba6c9e7651d7e2c2ffd0efb306027652d1446a34d6c29f15cd9e9e4e7e@ec2-54-158-247-97.compute-1.amazonaws.com:5432/d8vcq1crfrtkvm