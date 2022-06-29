const config = require("../../assets/test/dbConfig.json");

process.env.DATABASE_HOST = config.host;
process.env.DATABASE_PORT = config.port;
process.env.DATABASE_USER = config.user;
process.env.DATABASE_PASSWORD = config.password;
process.env.DATABASE_DBNAME = config.dbName;

import App from '../../src/app';






App.listen(3000,()=> {
    console.log("start");
});