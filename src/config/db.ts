const initVar = (e : string | undefined,init : string) => e != undefined ? e : init;

export const  host = initVar(process.env["DATABASE_HOST"],"localhost");
export const  port = parseInt(initVar(process.env["DATABASE_PORT"],"3306"));
export const user = initVar(process.env["DATABASE_USER"],"root");
export const password = initVar(process.env["DATABASE_PASSWORD"],"");
export const dbName = initVar(process.env["DATABASE_DBNAME"],"");