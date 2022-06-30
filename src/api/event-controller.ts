import Router from 'koa-router';

import {ExtendContext} from '../utils/extend/koa/context';
import BodyType from './body/event';

import addReviewService from '../services/add_review';
import modReviewService from '../services/mod_review';
import deleteReviewService from '../services/delete_review';

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
};

const modTypeReviewHandle = async (ctx : ExtendContext,body : BodyType)=>  {
    body.content = body.content == "" ? null : body.content;
    try {
        await modReviewService(ctx,body);
    }catch(e) {
        throw new ErrorObject(ErrorType.DB,"/events",500,JSON.stringify(e));
    }
};

const deleteTypeReviewHandle = async (ctx : ExtendContext,body : BodyType) => {
    const reviewId = body.reviewId;
    try {
        await deleteReviewService (ctx,reviewId);
    }catch(e) {
        throw new ErrorObject(ErrorType.DB,"/events",500,JSON.stringify(e));
    }
};

const checkP = (body : any) => checkProps<BodyType>(body,
    ["action","placeId","reviewId","type","userId"]);

controller.post("review-event","/events",async (ctx)=> {
    const requestBody : BodyType = ctx.request.body;
    
    if(!checkP(requestBody))
        throw new ErrorObject(ErrorType.Request,"/events",400,`bad request body : ${JSON.stringify(requestBody)}`);
    
    if(requestBody.action == "ADD") {
        await addTypeReviewHandle(ctx,requestBody);
        ctx.status = 201;
        ctx.body = "Ok";
    }
    else if(requestBody.action == "MOD") {
        await modTypeReviewHandle(ctx,requestBody);
        ctx.status = 200;
        ctx.body = "Ok";
    }
    else if(requestBody.action == "DELETE") {
        await deleteTypeReviewHandle(ctx,requestBody);
        ctx.status = 204;
        ctx.body = "Ok";
    }
    else {
        throw new ErrorObject(ErrorType.Request,"/events",400,`not allow this action : ${requestBody.action}`);
    }
}) ;


export default controller;


