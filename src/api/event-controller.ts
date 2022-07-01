import Router from 'koa-router';

import {ExtendContext} from '../utils/extend/koa/context';
import BodyType from './body/event';

import addReviewService from '../services/add_review';
import modReviewService from '../services/mod_review';
import deleteReviewService from '../services/delete_review';

import {checkProps} from '../utils/json/check_props';
import {ErrorObject,ErrorType} from '../middleware/type/error-object';


const controller = new Router<any,ExtendContext>();
/**
 * 
 *  리뷰 생성 핸들러
 * @param ctx
 * koa 커스텀 확장 컨텍스트
 * @param body
 * 리퀘스트 body
 */
const addTypeReviewHandle = async (ctx : ExtendContext,body : BodyType)=>  {
    try {
        await addReviewService(ctx,body);
    }catch(e) {
        if(e instanceof ErrorObject)throw e;
        throw new ErrorObject(ErrorType.DB,"/events",500,JSON.stringify(e));
    }
};
/**
 * 리뷰 컨텐츠, 이미지 배열 수정 핸들러
 * @param ctx 
 * koa 커스텀 확장 컨텍스트
 * @param body 
 * 리퀘스트 body
 */
const modTypeReviewHandle = async (ctx : ExtendContext,body : BodyType)=>  {
    try {
        await modReviewService(ctx,body);
    }catch(e) {
        if(e instanceof ErrorObject)throw e;
        throw new ErrorObject(ErrorType.DB,"/events",500,JSON.stringify(e));
    }
};
/**
 * 리뷰 삭제 핸들러
 * @param ctx 
 * koa 커스텀 확장 컨텍스트
 * @param body 
 * 리퀘스트 body, 사용하는 속성값은 reviewId 하나
 */
const deleteTypeReviewHandle = async (ctx : ExtendContext,body : BodyType) => {
    const reviewId = body.reviewId;
    try {
        await deleteReviewService (ctx,reviewId);
    }catch(e) {
        if(e instanceof ErrorObject)throw e;
        throw new ErrorObject(ErrorType.DB,"/events",500,JSON.stringify(e));
    }
};
/**
 * 리뷰 ADD | MOD 핸들러 리퀫트 body 필수 속성값 확인 함수
 * 만약 조건이 불일치일시  ErrorObject의 http code를 400으로 설정한후 에러를 throw 한다.
 * @param body 
 * 리퀘스트 body
 */
const checkAddAndModP = (body : any) => {
    const chk = !checkProps<BodyType>(body,
        ["placeId","reviewId","type","userId"]);

    if(chk)throw new ErrorObject(ErrorType.Request,
        "/events",400,
        `bad request body : ${JSON.stringify(body)}`);
}
/**
 * 리뷰 DELETE 핸들러 리퀫트 body 필수 속성값 확인 함수
 * 만약 조건이 불일치일시  ErrorObject의 http code를 400으로 설정한후 에러를 throw 한다.
 * @param body 
 * 리퀘스트 body
 */
const checkDeleteP = (body : any) => {
    const chk = !checkProps<BodyType>(body,["reviewId","type"]);

    if(chk)throw new ErrorObject(ErrorType.Request,
        "/events",400,
        `bad request body : ${JSON.stringify(body)}`);
}

controller.post("review-event","/events",async (ctx)=> {
    const requestBody : BodyType = ctx.request.body;

    if(!checkProps<BodyType>(requestBody,["action"]))
        throw new ErrorObject(ErrorType.Request,
            "/events",400,
            `not exist action prop`);
    
    if(requestBody.action == "ADD") {
        checkAddAndModP(requestBody);

        await addTypeReviewHandle(ctx,requestBody);
        ctx.status = 201;
        ctx.body = "Ok";
    }
    else if(requestBody.action == "MOD") {
        checkAddAndModP(requestBody);

        await modTypeReviewHandle(ctx,requestBody);
        ctx.status = 200;
        ctx.body = "Ok";
    }
    else if(requestBody.action == "DELETE") {
        checkDeleteP(requestBody);
        
        await deleteTypeReviewHandle(ctx,requestBody);
        ctx.status = 204;
        ctx.body = "Ok";
    }
    else {
        throw new ErrorObject(ErrorType.Request,"/events",400,`not allow this action : ${requestBody.action}`);
    }
});


export default controller;


