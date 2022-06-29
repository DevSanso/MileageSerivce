import {Context} from 'koa';
import Router from 'koa-router';

import {ExtendContext} from '../utils/extend/koa/context';
import BodyType from './body/event';

import createReviewService from '../services/db/create_review';
import selectUserPointService from '../services/db/select_user_point';
import selectReviewPointFlag from '../services/db/select_review_point_flag';
import createUserPointService from '../services/db/create_user_point';
import insertPointPlusLogService from '../services/db/insert_plus_log';
import updateReviewPointFlagService from '../services/db/update_review_point_flag';

import {checkProps} from '../utils/json/check_props';
import {ErrorObject,ErrorType} from '../middleware/type/error-object';
import ReviewPointFlag from '../models/review_point_flag';


const controller = new Router<any,ExtendContext>();



const afterTreatment = async (ctx : Context) => {
    const body : Pick<BodyType,"reviewId"> = ctx.request.body;
    const flag = await selectReviewPointFlag(ctx,body.reviewId) as ReviewPointFlag;

    if(flag.isFirstReview || flag.isTextWrite || flag.isUpdateImage) 
        await insertPointPlusLogService(ctx,body.reviewId,flag);
}

const addReviewHandle = async (ctx : Context)=> {
    const conn = await ctx.dbPoolConn;
    conn.beginTransaction();
    try {
        await createReviewService(ctx);
        const exist = await selectUserPointService(ctx);
        if (exist == null)await createUserPointService(ctx); 
        await updateReviewPointFlagService(ctx);
        await conn.commit();
    }catch(e) {
        conn.rollback();
        throw new ErrorObject(ErrorType.DB,"/events",500,JSON.stringify(e));
    }
    afterTreatment(ctx);
}



const checkP = (body : any) => checkProps<BodyType>(body,
    ["action","attachedPhotoIds","content","placeId","reviewId","type","userId"]);




controller.post("review-event","/events",async (ctx)=> {
    const requestBody : BodyType = ctx.request.body;
    
    if(!checkP(requestBody))
        throw new ErrorObject(ErrorType.Request,"/events",400,`bad request body : ${JSON.stringify(requestBody)}`);
    
    if(requestBody.action == "ADD") {
        await addReviewHandle(ctx);
        ctx.status = 200;
        ctx.body = "Ok";
    }
    else if(requestBody.action == "MOD" || requestBody.action == "DELETE") {
        throw new ErrorObject(ErrorType.Request,"/events",400,`not implement action handle : ${requestBody.action}`);
    }
    else {
        throw new ErrorObject(ErrorType.Request,"/events",400,`not allow this action : ${requestBody.action}`);
    }
}) ;


export default controller;


