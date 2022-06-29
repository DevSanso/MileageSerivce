import Koa from 'koa';

import RequestBody from '../../api/body/event';
import LogDao from '../../dao/log';
import ReviewDao from '../../dao/review';






const insertImages = async(body : RequestBody, dao : ReviewDao) => {
    for(let i =0;i<body.attachedPhotoIds.length;i++)
        await dao.insertReviewContent(body.reviewId,body.attachedPhotoIds[i]);
};

const createReviewService = async (ctx : Koa.Context) => {
    const body = ctx.request.body as RequestBody;
    const dao = await ctx.daoProvider.review();
    
    await dao.insertReview(body);
    await insertImages(body,dao);
    await dao.createReviewPointFlag(body.reviewId);
}

export default createReviewService;