import {ExtendContext} from '../../utils/extend/koa/context';

const selectPointPlusLogService = async (ctx : ExtendContext) => {
    const dao = await ctx.daoProvider.log();
    const result = await dao.selectAllLog();
    return result;
}

export default selectPointPlusLogService;