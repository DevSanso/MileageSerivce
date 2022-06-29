import Koa from 'koa';


import LogDao from '../../dao/log';
import ReviewPointFlag from '../../models/review_point_flag'
import DaoTxController from '../../middleware/type/dao-tx-controller';





const  insertPointPlusLogService = async (ctx : Koa.Context,reviewId : string,flags : ReviewPointFlag) => {
    const daoTx =  await ctx.daoProvider.log(true) as DaoTxController<LogDao>;
    try {
        daoTx.dao().insertPushPointIog(reviewId,flags.isTextWrite,flags.isUpdateImage,flags.isFirstReview);
    }catch(e) {
        daoTx.rollback();
        throw e;
    }
    daoTx.commit();
}

export default insertPointPlusLogService;
