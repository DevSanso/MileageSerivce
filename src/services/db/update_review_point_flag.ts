import Koa from 'koa';

import RequestBody from '../../api/body/event';
import ReviewDao from '../../dao/review';



import DaoTxController from '../../middleware/type/dao-tx-controller';

import '../../utils/extend/koa/context_dao';


const updateReviewPointFlagService = async (ctx : Koa.Context) => {
    const body = ctx.request.body as RequestBody;
    const daoTx = await ctx.daoProvider.review(true) as DaoTxController<ReviewDao>;
    try {
        await daoTx.dao().updateReviewPoint(body.reviewId,body.placeId);
    }catch(e) {
        daoTx.rollback();
        throw e;
    }
}

export default updateReviewPointFlagService;