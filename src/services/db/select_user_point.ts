import Koa from 'koa';

import {UserRequestBody} from '../../api/body/select';

import UserPoint from '../../models/user_point';




const selectUserPointService = async (ctx : Koa.Context) : Promise<UserPoint | null>=> {
    const body = ctx.request.body as Pick<UserRequestBody,"userId">;
    const dao = await ctx.daoProvider.user() ;
    let res = await dao.selectUserPoint(body.userId);
    return res;
}


export default selectUserPointService;
