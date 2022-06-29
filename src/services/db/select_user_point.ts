import Koa from 'koa';

import {UserRequestBody} from '../../api/body/select';


import UserDao from '../../dao/user';
import DaoTxController from '../../middleware/type/dao-tx-controller';
import UserPoint from '../../models/user_point';




const selectUserPointService = async (ctx : Koa.Context) : Promise<UserPoint | null>=> {
    const body = ctx.request.body as Pick<UserRequestBody,"userId">;
    const dao = await ctx.daoProvider.user(false) as UserDao;
    let res = await dao.selectUserPoint(body.userId);
    return res;
}


export default selectUserPointService;
