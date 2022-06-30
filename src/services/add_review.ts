import {ExtendContext} from '../utils/extend/koa/context';

import RequestBody from '../api/body/event';
import ReviewPointFlag from '../models/review_point_flag';

import createReviewService from './db/create_review';
import createUserPointService from './db/create_user_point';
import selectUserPointService from './db/select_user_point';
import updateReviewPointFlagService from './db/update_review_point_flag';
import selectReviewPointFlagService from './db/select_review_point_flag';
import insertPointPlusLogService from './db/insert_plus_log';
import updateUserPointService from './db/update_user_point';

type ServiceArgsType = Omit<RequestBody,"action" | "type" >;


const afterTreatment = async (ctx : ExtendContext,args : ServiceArgsType) => {
    const flag = await selectReviewPointFlagService(ctx,args.reviewId) as ReviewPointFlag;
    if(flag.isFirstReview || flag.isTextWrite || flag.isUpdateImage) 
        await insertPointPlusLogService(ctx,args.reviewId,flag);
}

const addReviewService = async (ctx : ExtendContext,args : ServiceArgsType) => {
    const conn = await ctx.dbPoolConn;
    try {
        await conn.beginTransaction();
        await createReviewService(ctx,args);
        await updateReviewPointFlagService(ctx,args.reviewId,args.placeId);
        const exist = await selectUserPointService(ctx,args.userId);
        if (exist == null)await createUserPointService(ctx,args.userId); 
        await afterTreatment(ctx,args);
        
        await conn.commit();
    }catch(e) {
        conn.rollback();
        throw e;
    }
}

export default addReviewService;

