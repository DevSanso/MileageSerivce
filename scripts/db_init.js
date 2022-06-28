const path = require("path");
const fs =  require('fs/promises');
const cp = require('child_process');
const dbConfig = require("../assets/test/dbConfig.json");


const p = (sub) => path.join(process.cwd(),sub);

const shell = (host,user,password,database,sqlPath) =>`mysql -h${host} -u${user} -p${password} ${database}< ${sqlPath}`;

const run = (conf,sqlPath) => {
    let host = conf.host;
    let user = conf.user;
    let password = conf.password;
    let database = conf.dbName;

    cp.execSync(shell(host,user,password,database,sqlPath));
};

run(dbConfig,p("/assets/sql/table.sql"));
run(dbConfig,p("/assets/sql/index.sql"));
run(dbConfig,p("/assets/sql/trigger.sql"));
run(dbConfig,p("/assets/sql/procedure.sql"));

