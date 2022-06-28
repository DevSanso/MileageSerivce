import Router from 'koa-router';


import selectUserPointService from '../services/db/select_user_point';

import {UserRequestBody} from './body/select';
import {convertCtxType} from '../utils/koa/convert_ctx_type';
import {checkProps} from '../utils/json/check_props';
import {ErrorObject,ErrorType} from '../middleware/type/error-object';


const controller = new Router();

controller.post("select-user-point","/point/user",async (ctx,next)=> {
    const body = ctx.request.body as UserRequestBody;
    if(!checkProps<UserRequestBody>(body,["userId"])) 
        throw new ErrorObject(ErrorType.Request,400,`bad request body : ${JSON.stringify(body)}`);
    
    const convertCtx = convertCtxType(ctx);
    const res = await selectUserPointService(convertCtx);

    if(res == null) 
        throw new ErrorObject(ErrorType.Request,400,`not exist user data : ${body.userId}`);
    
    ctx.status = 200;
    ctx.body = JSON.stringify(res);
    next();
});

controller.post("select-point","/point/place",(ctx,next)=> {
   
});


controller.post("select-point","/point/review",(ctx,next)=> {
    
}) ;

export default controller;

