import Koa from 'koa';

import RequestBody from '../../api/body/event';
import ReviewDao from '../../dao/review';
import DaoTxController from '../../middleware/type/dao-tx-controller';
import ReviewPointFlag from '../../models/review_point_flag';

const selectReviewPointFlagService = async (ctx : Koa.Context,reviewId : string) => {
    const dao = await ctx.daoProvider.review(false) as ReviewDao;
    const result = await dao.selectReviewPointFlag(reviewId);
    return result;
}

export default selectReviewPointFlagService;