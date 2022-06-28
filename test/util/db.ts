import mysql from 'mysql2/promise';
const dbConfig = require("../../assets/test/dbConfig.json");


export default () : mysql.Pool => {
    return mysql.createPool({
        host : dbConfig.host,
        port : dbConfig.port,
        user : dbConfig.user,
        password : dbConfig.password,
        database :dbConfig.dbName
    });
};