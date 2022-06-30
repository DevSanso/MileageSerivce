import {ExtendContext} from '../../utils/extend/koa/context';

import RequestBody from '../../api/body/event';
import ReviewDao from '../../dao/review';

type ServiceArgsType = Omit<RequestBody,"action" | "type" >;

const insertImages = async(body : ServiceArgsType, dao : ReviewDao) => {
    if (body.attachedPhotoIds == undefined)return;
    for(let i =0;i<body.attachedPhotoIds.length;i++)
        await dao.insertReviewContent(body.reviewId,body.attachedPhotoIds[i]);
};

const createReviewService = async (ctx : ExtendContext,args : ServiceArgsType) => {
    const dao = ctx.daoProvider.review();
    const daoFlag = ctx.daoProvider.reviewPointFlag();

    await dao.insertReview(args);
    await insertImages(args,dao);
    await daoFlag.createReviewPointFlag(args.reviewId);
}

export default createReviewService;