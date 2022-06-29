import Koa from 'koa';

import ReviewPointFlag from '../../models/review_point_flag'






const  insertPointPlusLogService = async (ctx : Koa.Context,reviewId : string,flags : ReviewPointFlag) => {
    const dao =  await ctx.daoProvider.log();
    dao.insertPushPointIog(reviewId,flags.isTextWrite,flags.isUpdateImage,flags.isFirstReview);
}

export default insertPointPlusLogService;
