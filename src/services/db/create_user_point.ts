import {ExtendContext} from '../../utils/extend/koa/context';


const createUserPointService = async (ctx : ExtendContext,userId : string) => {
    const dao = await ctx.daoProvider.user();
    await dao.createUserPoint(userId);
}

export default createUserPointService;