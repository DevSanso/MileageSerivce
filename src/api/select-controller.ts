import Router from 'koa-router';


import selectUserPointService from '../services/db/select_user_point';
import updateUserPointService from '../services/db/update_user_point';
import selectReviewPointService from '../services/db/select_review_point';

import {UserRequestBody,ReviewRequestBody} from './body/select';
import {convertCtxType} from '../utils/koa/convert_ctx_type';
import {checkProps} from '../utils/json/check_props';
import {ErrorObject,ErrorType} from '../middleware/type/error-object';


const controller = new Router();

const selectUserPointHandle = async (ctx : Router.IRouterContext)=> {
    const body = ctx.request.body as UserRequestBody;
    if(!checkProps<UserRequestBody>(body,["userId"])) 
        throw new ErrorObject(ErrorType.Request,"/point/user",400,`bad request body : ${JSON.stringify(body)}`);

    const convertCtx = convertCtxType(ctx);
    const conn = await convertCtx.dbPoolConn;
    
    try {
        await conn.beginTransaction();
        await updateUserPointService(convertCtx);
        await conn.commit();
    }catch(e) {
        conn.rollback();
        throw e;
    }

    const res = await selectUserPointService(convertCtx);

    if(res == null) 
        throw new ErrorObject(ErrorType.Request,"/point/user",400,`not exist user data : ${body.userId}`);
    
    ctx.status = 200;
    ctx.body = JSON.stringify(res);
  
};

const selectPointHandle = async (ctx : Router.IRouterContext)=> {
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
};




controller.post("select-user-point","/point/user",selectUserPointHandle);
controller.post("select-point","/point/review",selectPointHandle) ;
export default controller;

