
const pgp = require("pg-promise")();
require("dotenv").config();

const cn = {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PW,
    max: 30 // use up to 30 connections

    // "types" - in case you want to set custom type parsers on the pool level
};
console.log(cn)


const db = pgp(cn);

module.exports = db;
