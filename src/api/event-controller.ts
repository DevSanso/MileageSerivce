import {Context} from 'koa';
import Router from 'koa-router';


import BodyType from './body/event';

import createReviewService from '../services/db/create_review';
import selectUserPointService from '../services/db/select_user_point';
import createUserPointService from '../services/db/create_user_point';
import updateReviewPointFlagService from '../services/db/update_review_point_and_update_plus_log_flag';

import {convertCtxType} from '../utils/koa/convert_ctx_type';
import {checkProps} from '../utils/json/check_props';
import {ErrorObject,ErrorType} from '../middleware/type/error-object';



const controller = new Router();



const addReviewHandle = async (ctx : Context)=> {
    await createReviewService(ctx);
    const exist = await selectUserPointService(ctx);
    if (exist == null)await createUserPointService(ctx); 
    await updateReviewPointFlagService(ctx);
}

const checkP = (body : any) => checkProps<BodyType>(body,
    ["action","attachedPhotoIds","content","placeId","reviewId","type","userId"]);

controller.post("review-event","/events",async (ctx)=> {
    const requestBody : BodyType = ctx.request.body;

    if(!checkP(requestBody))
        throw new ErrorObject(ErrorType.Request,"/events",400,`bad request body : ${JSON.stringify(requestBody)}`);

    const convertCtx = convertCtxType(ctx);

    if(requestBody.action == "ADD") {
        addReviewHandle(convertCtx);
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


