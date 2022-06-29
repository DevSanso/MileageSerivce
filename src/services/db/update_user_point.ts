import {ExtendContext} from '../../utils/extend/koa/context';




const updateDbUserPointService = async (ctx : ExtendContext,userId : string) => {
    const dao = await ctx.daoProvider.user();
    await dao.updateUserPoint(userId);
}

export default updateDbUserPointService;