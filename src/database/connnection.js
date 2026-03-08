const { Pool } = require("pg")

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "postgres",
    database: "ordersdb",
    port: 5433,
    timezone: 'UTC'
})

module.exports = pool