import {ExtendContext} from '../../utils/extend/koa/context';




const selectReviewService = async (ctx : ExtendContext,reviewId : string,comment : string | null) => {
    const dao = await ctx.daoProvider.review();
    return  await dao.updateReviewComment(reviewId,comment);
}
export default selectReviewService;