import Koa from 'koa';

import RequestBody from '../../api/body/event';
import ReviewDao from '../../dao/review';

import DaoTxController from '../../middleware/type/dao-tx-controller';




const insertImages = async(body : RequestBody, tx : DaoTxController<ReviewDao>) => {
    for(let i =0;i<body.attachedPhotoIds.length;i++)
        await tx.dao().insertReviewContent(body.reviewId,body.attachedPhotoIds[i]);
};

const createReviewService = async (ctx : Koa.Context) => {
    const body = ctx.request.body as RequestBody;
    const daoTx = await ctx.daoProvider.review(true) as DaoTxController<ReviewDao>;
    try {
        await daoTx.dao().insertReview(body);
        await insertImages(body,daoTx);
        await daoTx.dao().createReviewPointFlag(body.reviewId);
    }catch(e) {
        daoTx.rollback();
        throw e;
    }
    daoTx.commit();
}

export default createReviewService;