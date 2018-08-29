const { Pool } = require('pg');
const url = require('url');
require('env2')('./config.env');

const DB_URL = process.env.DB_URL;

if (process.env.NODE_ENV)
    DB_URL = TEST_DB_URL;

if (!DB_URL)
    throw new TypeError('The DB_URL  Is Not Found');

const params = url.parse(DB_URL);
const [username, password] = params.auth.split(':');

const options = {
    host: params.hostname,
    port: params.port,
    database: params.path.split('/')[1],
    user: username,
    password,
    ssl:false,
    max: process.env.MAX_DB_CONNECTIONS || 2,
    ssl: process.env.host !== 'localhost'
}

module.exports = new Pool(options);
