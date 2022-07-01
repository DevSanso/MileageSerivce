import {ExtendContext} from '../../utils/extend/koa/context';




const updateReviewContentService = async (ctx : ExtendContext,reviewId : string,comment : string) => {
    const dao = await ctx.daoProvider.review();
    return  await dao.updateReviewComment(reviewId,comment);
}
export default updateReviewContentService;