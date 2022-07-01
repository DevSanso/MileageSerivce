const initVar = (e : string | undefined,init : string) => e != undefined ? e : init;

/**
 * 데이터베이스 호스트,
 * 환경변수 DATABASE_HOST의 값을 읽어온다.
 */
export const  host = initVar(process.env["DATABASE_HOST"],"localhost");
/**
 * 데이터베이스 포트,
 * 환경변수 DATABASE_PORT의 값을 읽어온다.
 */
export const  port = parseInt(initVar(process.env["DATABASE_PORT"],"3306"));
/**
 * 데이터베이스 유저,
 * 환경변수 DATABASE_USER의 값을 읽어온다.
 */
export const user = initVar(process.env["DATABASE_USER"],"root");
/**
 * 데이터베이스 유저 패스워드,
 * 환경변수 DATABASE_PASSWORD의 값을 읽어온다.
 */
export const password = initVar(process.env["DATABASE_PASSWORD"],"");
/**
 * 데이터베이스 디비 이름,
 * 환경변수 DATABASE_DBNAME의 값을 읽어온다.
 */
export const dbName = initVar(process.env["DATABASE_DBNAME"],"");