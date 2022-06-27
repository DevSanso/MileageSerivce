import mysql from 'mysql2/promise';
import Koa from 'koa';

import * as config from '../config/db';

import '../utils/extend/koa/context_dbconn';


const pool = mysql.createPool({
    host : config.host,
    port : config.port,
    user : config.user,
    password : config.password,
    database : config.dbName
});

const middleware  = async (ctx : Koa.Context,next : Koa.Next) => {
    ctx.dbPoolConn  = pool.getConnection();

    await next();
};

export default middleware;