import mysql from 'mysql2/promise';
import Koa from 'koa';



import '../utils/extend/koa/context_dbconn';




const middleware  =async (ctx : Koa.Context,next : Koa.Next) => {
    (await ctx.dbPoolConn).release();

    await next();
};

export default middleware;