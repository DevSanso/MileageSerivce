import Koa from 'koa';

import {UserRequestBody} from '../../api/body/select';


import UserDao from '../../dao/user';



const createUserPointService = async (ctx : Koa.Context) => {
    const body = ctx.request.body as Pick<UserRequestBody,"userId">;
    const dao = await ctx.daoProvider.user();
    await dao.createUserPoint(body.userId);
}

export default createUserPointService;