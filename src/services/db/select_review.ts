import {ExtendContext} from '../../utils/extend/koa/context';

const selectReviewService = async (ctx : ExtendContext,reviewId : string) => {
    const dao = await ctx.daoProvider.review();
    return  await dao.selectReview(reviewId);
   
}
export default selectReviewService;
