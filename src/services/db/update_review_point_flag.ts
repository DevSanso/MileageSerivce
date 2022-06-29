import Koa from 'koa';

import RequestBody from '../../api/body/event';
import ReviewDao from '../../dao/review';


const updateReviewPointFlagService = async (ctx : Koa.Context) => {
    const body = ctx.request.body as RequestBody;
    const dao = await ctx.daoProvider.review() ;
    await dao.updateReviewPointFlag(body.reviewId,body.placeId);

}

export default updateReviewPointFlagService;