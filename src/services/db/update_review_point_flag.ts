import Koa from 'koa';

import RequestBody from '../../api/body/event';
import ReviewDao from '../../dao/review';


const updateReviewPointFlagService = async (ctx : Koa.Context,reviewId : string,placeId : string) => {
    const dao = await ctx.daoProvider.review() ;
    await dao.updateReviewPointFlag(reviewId,placeId);

}

export default updateReviewPointFlagService;