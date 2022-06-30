import {ExtendContext} from '../../utils/extend/koa/context';

const selectReviewPointFlagService = async (ctx : ExtendContext,reviewId : string) => {
    const dao = await ctx.daoProvider.reviewPointFlag();
    const result = await dao.selectReviewPointFlag(reviewId);
    return result;
}

export default selectReviewPointFlagService;