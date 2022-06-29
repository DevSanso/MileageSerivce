import {ExtendContext} from '../../utils/extend/koa/context';

import ReviewPointFlag from '../../models/review_point_flag'






const  insertPointPlusLogService = async (ctx : ExtendContext,reviewId : string,flags : ReviewPointFlag) => {
    const dao =  await ctx.daoProvider.log();
    await dao.insertPushPointIog(reviewId,flags.isTextWrite,flags.isUpdateImage,flags.isFirstReview);
}

export default insertPointPlusLogService;
