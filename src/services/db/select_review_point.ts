import Koa from 'koa';


import {ReviewRequestBody} from '../../api/body/select';
import ReviewDao from '../../dao/review';
import ReviewPointFlag from '../../models/review_point_flag';




const selectReviewPointService = async (ctx : Koa.Context) => {
    const body = ctx.request.body as ReviewRequestBody;

    const dao = await ctx.daoProvider.review(false) as ReviewDao;
    let res : ReviewPointFlag | null = null;
    try {
        res = await dao.selectReviewPointFlag(body.reviewId);
    }catch(e) {
        throw e;
    }
    const cast = res as ReviewPointFlag;
    return (cast.isFirstReview ? 1 : 0) + (cast.isTextWrite ? 1:0) + (cast.isUpdateImage ? 1:0);
}

export default selectReviewPointService;
