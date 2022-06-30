import Koa from 'koa';

import {ExtendContext} from '../utils/extend/koa/context';

import ReviewDao from '../dao/review';
import UserDao from '../dao/user';
import LogDao from '../dao/log';
import ReviewPointFlagDao from '../dao/review_point_flag';



const middleware  =async (ctx : ExtendContext,next : Koa.Next) => {
    ctx.daoProvider = {
        review : () => new ReviewDao(ctx.dbPoolConn),
        user : () => new UserDao(ctx.dbPoolConn),
        log : () => new LogDao(ctx.dbPoolConn),
        reviewPointFlag : () => new ReviewPointFlagDao(ctx.dbPoolConn)
    };
    await next();
};

export default middleware;