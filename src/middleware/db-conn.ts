import mysql from 'mysql2/promise';
import Koa from 'koa';

import * as config from '../config/db';

import '../utils/extend/koa/context';


const pool = mysql.createPool({
    host : config.host,
    port : config.port,
    user : config.user,
    password : config.password,
    database : config.dbName
});

const middleware  = (ctx : Koa.Context,next : Koa.Next) => {
    ctx.dbPoolConn  = pool.getConnection();
}

export default middleware;