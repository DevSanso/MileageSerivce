import Koa from 'koa';

import RequestBody from '../../api/body/event';


import UserDao from '../../dao/user';





const updateDbUserPointService = async (ctx : Koa.Context,userId : string) => {
    const dao = await ctx.daoProvider.user();
    await dao.updateUserPoint(userId);
}

export default updateDbUserPointService;