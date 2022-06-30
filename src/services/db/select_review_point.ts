import {ExtendContext} from '../../utils/extend/koa/context';
import ReviewPointFlag from '../../models/review_point_flag';




const selectReviewPointService = async (ctx : ExtendContext,reviewId : string) => {
    const dao = await ctx.daoProvider.reviewPointFlag();
    let res = await dao.selectReviewPointFlag(reviewId);
    
    if (res == null)return null;

    const cast = res as ReviewPointFlag;
    return (cast.isFirstReview ? 1 : 0) + (cast.isTextWrite ? 1:0) + (cast.isUpdateImage ? 1:0);
}

export default selectReviewPointService;
