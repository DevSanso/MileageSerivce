import Koa from 'koa';

import RequestBody from '../../api/body/event';
import LogDao from '../../dao/log';
import ReviewDao from '../../dao/review';



import DaoTxController from '../../middleware/type/dao-tx-controller';
import ReviewPointFlag from '../../models/review_point_flag';


const changeFlagToNumber = (flag : ReviewPointFlag) =>
 (flag.isFirstReview ? 1 : 0) + (flag.isTextWrite ? 1 : 0) + (flag.isUpdateImage ? 1 : 0);

const updateAndGetPointwithOldAndCurrent =async (reviewId : string,placeId : string,daoTx : DaoTxController<ReviewDao>) 
:Promise<[old : ReviewPointFlag,current : ReviewPointFlag]>=> {
    const old = await daoTx.dao().selectReviewPointFlag(reviewId) as ReviewPointFlag;
    await daoTx.dao().updateReviewPointFlag(reviewId,placeId);
    const current = await daoTx.dao().selectReviewPointFlag(reviewId) as ReviewPointFlag;

    return [old,current]
}

const updateReviewPointService = async (ctx : Koa.Context) => {
    const body = ctx.request.body as RequestBody;
    const daoTx = await ctx.daoProvider.review(true) as DaoTxController<ReviewDao>;
    let logTx : DaoTxController<LogDao> | null = null;
    try {
        const [old,current] = await updateAndGetPointwithOldAndCurrent(body.reviewId,body.placeId,daoTx);
        
        if(changeFlagToNumber(current)> changeFlagToNumber(old)) {
            logTx = await ctx.daoProvider.log(true) as DaoTxController<LogDao>;
            await logTx.dao()
            .insertPushPointIog(body.reviewId,current.isTextWrite,current.isUpdateImage,current.isFirstReview);
        }
    }catch(e) {
        daoTx.rollback();
        if(logTx != null)logTx.rollback();
        throw e;
    }
    daoTx.commit();
    if(logTx != null)logTx.commit();
}

export default updateReviewPointService;