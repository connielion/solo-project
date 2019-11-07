const { Pool } = require('pg');
const PG_URL = process.env.URI;

const pool = new Pool({
    connectionString: PG_URL
})

module.exports = {
    query: (text, value, callback) => {
        console.log('querying db: ', text)
        return pool.query(text, value, callback)
    }
}