import Koa from 'koa';

import RequestBody from '../../api/body/event';


import UserDao from '../../dao/user';





const updateDbUserPointService = async (ctx : Koa.Context) => {
    const body = ctx.request.body as RequestBody;
    const dao = await ctx.daoProvider.user();
    await dao.updateUserPoint(body.userId);
}

export default updateDbUserPointService;