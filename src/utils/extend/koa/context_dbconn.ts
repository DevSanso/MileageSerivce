import mysql from 'mysql2/promise'


declare module "koa" {
    interface Context {
        dbPoolConn : Promise<mysql.PoolConnection>
    }
}