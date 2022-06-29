import koa from 'koa';
import mysql from 'mysql2/promise';

import ReviewDao from '../../../dao/review';
import UserDao from '../../../dao/user';
import LogDao from '../../../dao/log';

type Context = koa.Context;

export interface ExtendContext extends Context{
    dbPoolConn : Promise<mysql.PoolConnection>,
    daoProvider : {
        review : ()=> ReviewDao
        user : () => UserDao
        log : () => LogDao
    }
}