import Router from 'koa-router';

import {ExtendContext} from '../utils/extend/koa/context';
import BodyType from './body/event';

import addReviewService from '../services/add_review';

import {checkProps} from '../utils/json/check_props';
import {ErrorObject,ErrorType} from '../middleware/type/error-object';


const controller = new Router<any,ExtendContext>();

const addTypeReviewHandle = async (ctx : ExtendContext,body : BodyType)=>  {
    body.content = body.content == "" ? null : body.content;
    try {
        await addReviewService(ctx,body);
    }catch(e) {
        throw new ErrorObject(ErrorType.DB,"/events",500,JSON.stringify(e));
    }
}

const checkP = (body : any) => checkProps<BodyType>(body,
    ["action","attachedPhotoIds","content","placeId","reviewId","type","userId"]);


controller.post("review-event","/events",async (ctx)=> {
    const requestBody : BodyType = ctx.request.body;
    
    if(!checkP(requestBody))
        throw new ErrorObject(ErrorType.Request,"/events",400,`bad request body : ${JSON.stringify(requestBody)}`);
    
    if(requestBody.action == "ADD") {
        await addTypeReviewHandle(ctx,requestBody);
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


