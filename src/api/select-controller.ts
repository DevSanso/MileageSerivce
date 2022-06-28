import Router from 'koa-router';


import selectUserPointService from '../services/db/select_user_point';
import updateUserPointService from '../services/db/update_user_point';
import selectReviewPointService from '../services/db/select_review_point';

import {UserRequestBody,ReviewRequestBody} from './body/select';
import {convertCtxType} from '../utils/koa/convert_ctx_type';
import {checkProps} from '../utils/json/check_props';
import {ErrorObject,ErrorType} from '../middleware/type/error-object';


const controller = new Router();

controller.post("select-user-point","/point/user",async (ctx)=> {
    const body = ctx.request.body as UserRequestBody;
    if(!checkProps<UserRequestBody>(body,["userId"])) 
        throw new ErrorObject(ErrorType.Request,"/point/user",400,`bad request body : ${JSON.stringify(body)}`);
    
    const convertCtx = convertCtxType(ctx);
    await updateUserPointService(convertCtx);
    const res = await selectUserPointService(convertCtx);

    if(res == null) 
        throw new ErrorObject(ErrorType.Request,"/point/user",400,`not exist user data : ${body.userId}`);
    
    ctx.status = 200;
    ctx.body = JSON.stringify(res);
  
});

controller.post("select-point","/point/review",async (ctx)=> {
    const body = ctx.request.body as ReviewRequestBody;

    if(!checkProps<ReviewRequestBody>(body,["reviewId"])) 
        throw new ErrorObject(ErrorType.Request,"/point/user",400,`bad request body : ${JSON.stringify(body)}`);
    
    const convertCtx = convertCtxType(ctx);
    const point = await selectReviewPointService(convertCtx);
    const responseBody = {
        point : point
    };
    ctx.status = 200;
    ctx.body = JSON.stringify(responseBody);
}) ;

export default controller;

