import {ExtendContext} from '../../utils/extend/koa/context';

import UserPoint from '../../models/user_point';




const selectUserPointService = async (ctx : ExtendContext,userId : string) : Promise<UserPoint | null>=> {
    const dao = await ctx.daoProvider.user() ;
    let res = await dao.selectUserPoint(userId);
    return res;
}


export default selectUserPointService;
