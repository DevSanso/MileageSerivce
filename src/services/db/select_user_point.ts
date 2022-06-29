import Koa from 'koa';

import {UserRequestBody} from '../../api/body/select';

import UserPoint from '../../models/user_point';




const selectUserPointService = async (ctx : Koa.Context,userId : string) : Promise<UserPoint | null>=> {
    const dao = await ctx.daoProvider.user() ;
    let res = await dao.selectUserPoint(userId);
    return res;
}


export default selectUserPointService;
