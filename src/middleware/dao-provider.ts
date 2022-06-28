import mysql from 'mysql2/promise';
import Koa from 'koa';

import ReviewDao from '../dao/review';
import UserDao from '../dao/user';
import DaoTxController from './type/dao-tx-controller';

import '../utils/extend/koa/context_dbconn';
import '../utils/extend/koa/context_dao';

import {PoolConnection} from 'mysql2/promise';

type CreateFuncReturnType<T> = Promise<T | DaoTxController<T>>;

const rollback = async (conn : PoolConnection) => conn.rollback();
const commit= async (conn : PoolConnection) => conn.commit();

const createReviewDao = async (conn : Promise<mysql.PoolConnection>,isTx : boolean) : CreateFuncReturnType<ReviewDao> => {
    if(isTx) {
        (await conn).beginTransaction();
        return {
            rollback : async() => {await rollback(await conn);},
            commit : async () => {await commit(await conn)},
            dao : () => new ReviewDao(conn)
        };
    }

    return new ReviewDao(conn);
};

const createUserDao = async (conn : Promise<mysql.PoolConnection>,isTx : boolean)  : CreateFuncReturnType<UserDao> => {
    if(isTx) {
        (await conn).beginTransaction();
        return {
            rollback : async() => {await rollback(await conn);},
            commit : async () => {await commit(await conn)},
            dao : () => new UserDao(conn)
        };
    }

    return new UserDao(conn);
};

const middleware  =async (ctx : Koa.Context,next : Koa.Next) => {
    ctx.daoProvider = {
        review : (isTx : boolean) => createReviewDao(ctx.dbPoolConn,isTx),
        user : (isTx : boolean) => createUserDao(ctx.dbPoolConn,isTx)
    };
    await next();
};

export default middleware;