import Koa from 'koa';

import RequestBody from '../../api/body/event';
import ReviewDao from '../../dao/review';
import DaoTxController from '../../middleware/type/dao-tx-controller';

const updateReviewPointFlagService = async (ctx : Koa.Context) => {
    const body = ctx.request.body as RequestBody;
    const daoTx = await ctx.daoProvider.review(true) as DaoTxController<ReviewDao>;
    try {
        await daoTx.dao().updateReviewPointFlag(body.reviewId,body.placeId);
    }catch(e) {
        daoTx.rollback();
        throw e;
    }
    daoTx.commit();
}

export default updateReviewPointFlagService;