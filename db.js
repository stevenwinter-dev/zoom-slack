const Pool = require('pg').Pool

const pool = new Pool({
    user: 'steven',
    password: 'password123',
    database: 'zoom_slack',
    host: 'localhost',
    port: 5432
})

module.exports = pool