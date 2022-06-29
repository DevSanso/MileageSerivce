import Koa from 'koa';

import ReviewDao from '../dao/review';
import UserDao from '../dao/user';
import LogDao from '../dao/log';


import '../utils/extend/koa/context_dbconn';
import '../utils/extend/koa/context_dao';



const middleware  =async (ctx : Koa.Context,next : Koa.Next) => {
    ctx.daoProvider = {
        review : () => new ReviewDao(ctx.dbPoolConn),
        user : () => new UserDao(ctx.dbPoolConn),
        log : () => new LogDao(ctx.dbPoolConn)
    };
    await next();
};

export default middleware;