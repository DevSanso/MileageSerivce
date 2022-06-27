import Koa from 'koa';

import RequestBody from '../../api/body/event';
import '../../utils/extend/koa/context_dao';


const updateDbUserPointService = async (ctx : Koa.Context) => {
    const body = ctx.request.body as RequestBody;
    await ctx.daoProvider.user().updateUserPoint(body.userId);
}

export default updateDbUserPointService;