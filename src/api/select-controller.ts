import Router from 'koa-router';

import {ExtendContext} from '../utils/extend/koa/context';

import getUserPointService from '../services/get_user_point';
import selectReviewPointService from '../services/db/select_review_point';

import {ErrorObject,ErrorType} from '../middleware/type/error-object';


const controller = new Router<any,ExtendContext>();

const selectUserPointHandle = async (ctx : ExtendContext)=> {
    const userIdQuery = ctx.query.userId as string;
    if(typeof userIdQuery !== "string") 
        throw new ErrorObject(ErrorType.Request,"/point/user",400,`not exist or miss match type userId query : url => ${ctx.url}`);
    
    const res = await getUserPointService(ctx,userIdQuery);

    if(res == null) 
        throw new ErrorObject(ErrorType.Request,"/point/user",400,`not exist user data : ${userIdQuery}`);
    
    ctx.status = 200;
    ctx.body = JSON.stringify(res);
  
};

const selectReviewPointHandle = async (ctx : ExtendContext)=> {
    const reviewQuery = ctx.query.reviewId as string;

    if(typeof reviewQuery !== "string") 
        throw new ErrorObject(ErrorType.Request,"/point/review",400,`not exist or miss match type  reviewIdQuery query : url => ${ctx.url}`);
    
    const point = await selectReviewPointService(ctx,reviewQuery);
    const responseBody = {
        point : point
    };
    ctx.status = 200;
    ctx.body = JSON.stringify(responseBody);
};




controller.get("select-user-point","/point/user",selectUserPointHandle);
controller.get("select-review-point","/point/review",selectReviewPointHandle) ;
export default controller;

