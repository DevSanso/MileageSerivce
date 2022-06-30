import Router from 'koa-router';

import {ExtendContext} from '../utils/extend/koa/context';
import BodyType from './body/event';

import addAndModReviewService from '../services/add_and_mod_review';

import {checkProps} from '../utils/json/check_props';
import {ErrorObject,ErrorType} from '../middleware/type/error-object';


const controller = new Router<any,ExtendContext>();

const addAndModTypeReviewHandle = async (ctx : ExtendContext,body : BodyType)=>  {
    body.content = body.content == "" ? undefined : body.content;
    if(body.action == "MOD" && body.attachedPhotoIds != undefined) {
        throw new ErrorObject(ErrorType.Request,"/events",400,`type : MOD not support change image uuid`);
    }
    try {
        await addAndModReviewService(ctx,body);
    }catch(e) {
        throw new ErrorObject(ErrorType.DB,"/events",500,JSON.stringify(e));
    }
}

const checkP = (body : any) => checkProps<BodyType>(body,
    ["action","placeId","reviewId","type","userId"]);

controller.post("review-event","/events",async (ctx)=> {
    const requestBody : BodyType = ctx.request.body;
    
    if(!checkP(requestBody))
        throw new ErrorObject(ErrorType.Request,"/events",400,`bad request body : ${JSON.stringify(requestBody)}`);
    
    if(requestBody.action == "ADD" || requestBody.action == "MOD") {
        await addAndModTypeReviewHandle(ctx,requestBody);
        ctx.status = 200;
        ctx.body = "Ok";
    }
    else if(requestBody.action == "DELETE") {
        throw new ErrorObject(ErrorType.Request,"/events",400,`not implement action handle : ${requestBody.action}`);
    }
    else {
        throw new ErrorObject(ErrorType.Request,"/events",400,`not allow this action : ${requestBody.action}`);
    }
}) ;


export default controller;


