import Router from 'koa-router';

import {ExtendContext} from '../utils/extend/koa/context';

import selectUserPointService from '../services/db/select_user_point';
import updateUserPointService from '../services/db/update_user_point';
import selectReviewPointService from '../services/db/select_review_point';

import {UserRequestBody,ReviewRequestBody} from './body/select';
import {checkProps} from '../utils/json/check_props';
import {ErrorObject,ErrorType} from '../middleware/type/error-object';


const controller = new Router<any,ExtendContext>();

const selectUserPointHandle = async (ctx : ExtendContext)=> {
    const body = ctx.request.body as UserRequestBody;
    if(!checkProps<UserRequestBody>(body,["userId"])) 
        throw new ErrorObject(ErrorType.Request,"/point/user",400,`bad request body : ${JSON.stringify(body)}`);
    const conn = await ctx.dbPoolConn;
    
    try {
        await conn.beginTransaction();
        await updateUserPointService(ctx);
        await conn.commit();
    }catch(e) {
        conn.rollback();
        throw new ErrorObject(ErrorType.DB,"/point/user",500,JSON.stringify(e));
    }

    const res = await selectUserPointService(ctx);

    if(res == null) 
        throw new ErrorObject(ErrorType.Request,"/point/user",400,`not exist user data : ${body.userId}`);
    
    ctx.status = 200;
    ctx.body = JSON.stringify(res);
  
};

const selectPointHandle = async (ctx : ExtendContext)=> {
    const body = ctx.request.body as ReviewRequestBody;

    if(!checkProps<ReviewRequestBody>(body,["reviewId"])) 
        throw new ErrorObject(ErrorType.Request,"/point/user",400,`bad request body : ${JSON.stringify(body)}`);
    

    const point = await selectReviewPointService(ctx);
    const responseBody = {
        point : point
    };
    ctx.status = 200;
    ctx.body = JSON.stringify(responseBody);
};




controller.post("select-user-point","/point/user",selectUserPointHandle);
controller.post("select-point","/point/review",selectPointHandle) ;
export default controller;

