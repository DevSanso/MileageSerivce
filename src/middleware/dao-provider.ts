import mysql from 'mysql2/promise';
import Koa from 'koa';

import ReviewDao from '../dao/review';
import UserDao from '../dao/user';

import '../utils/extend/koa/context_dbconn';
import '../utils/extend/koa/context_dao';

type DaoProvider = {
    review : ()=> ReviewDao
    user : () => UserDao
};

const createReviewDao = (conn : Promise<mysql.PoolConnection>) => new ReviewDao(conn);

const createUserDao = (conn : Promise<mysql.PoolConnection>) => new UserDao(conn);

const middleware  =async (ctx : Koa.Context,next : Koa.Next) => {
    ctx.daoProvider = {
        review : () => createReviewDao(ctx.dbPoolConn),
        user : () => createUserDao(ctx.dbPoolConn)
    };
    await next();
};

export default middleware;