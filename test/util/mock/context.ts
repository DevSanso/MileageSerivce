import mysql from 'mysql2/promise';

import {ExtendContext} from '../../../src/utils/extend/koa/context';
import ReviewDao from '../../../src/dao/review';
import UserDao from '../../../src/dao/user';
import LogDao from '../../../src/dao/log';
import reviewPointFlagDao from '../../../src/dao/review_point_flag';

export const onlyDaoContext = (conn : Promise<mysql.PoolConnection>) => {
    let empty : any = {};
    empty["dbPoolConn"] = conn;
    empty["daoProvider"] = {
        review : ()=> new ReviewDao(conn),
        user : () => new UserDao(conn),
        log : () => new LogDao(conn),
        reviewPointFlag : () => new reviewPointFlagDao(conn)
    };
    return empty as ExtendContext;
};
