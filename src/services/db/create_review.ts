import Koa from 'koa';

import RequestBody from '../../api/body/event';
import LogDao from '../../dao/log';
import ReviewDao from '../../dao/review';




type ServiceArgsType = Omit<RequestBody,"action" | "type" >;

const insertImages = async(body : ServiceArgsType, dao : ReviewDao) => {
    for(let i =0;i<body.attachedPhotoIds.length;i++)
        await dao.insertReviewContent(body.reviewId,body.attachedPhotoIds[i]);
};

const createReviewService = async (ctx : Koa.Context,args : ServiceArgsType) => {

    const dao = await ctx.daoProvider.review();
    
    await dao.insertReview(args);
    await insertImages(args,dao);
    await dao.createReviewPointFlag(args.reviewId);
}

export default createReviewService;