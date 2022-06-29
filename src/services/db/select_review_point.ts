import Koa from 'koa';

import {ReviewRequestBody} from '../../api/body/select';
import ReviewPointFlag from '../../models/review_point_flag';




const selectReviewPointService = async (ctx : Koa.Context,reviewId : string) => {
    const dao = await ctx.daoProvider.review();
    let res = await dao.selectReviewPointFlag(reviewId);
    
    if (res == null)return null;

    const cast = res as ReviewPointFlag;
    return (cast.isFirstReview ? 1 : 0) + (cast.isTextWrite ? 1:0) + (cast.isUpdateImage ? 1:0);
}

export default selectReviewPointService;
