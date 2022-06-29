import {ExtendContext} from '../../utils/extend/koa/context';


const updateReviewPointFlagService = async (ctx : ExtendContext,reviewId : string,placeId : string) => {
    const dao = await ctx.daoProvider.review() ;
    await dao.updateReviewPointFlag(reviewId,placeId);

}

export default updateReviewPointFlagService;