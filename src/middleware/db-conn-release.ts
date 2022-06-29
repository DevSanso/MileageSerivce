import mysql from 'mysql2/promise';
import Koa from 'koa';








const middleware  =async (ctx : Koa.Context,next : Koa.Next) => {
    await next();
    (await ctx.dbPoolConn).release();
};

export default middleware;