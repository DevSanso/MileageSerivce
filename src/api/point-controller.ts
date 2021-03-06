import Router from 'koa-router';

import {ExtendContext} from '../utils/extend/koa/context';

import getUserPointService from '../services/get_user_point';
import selectReviewPointService from '../services/db/select_review_point';
import selectAllPointPlusLogService from '../services/db/select_all_point_plus_log';

import {ErrorObject,ErrorType} from '../middleware/type/error-object';


const controller = new Router<any,ExtendContext>();
/**
 * 호출시점 유저의 포인트 총합 핸들러
 * @param ctx 
 * koa 커스텀 확장 컨텍스트
 */
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
/**
 * 추가된 리뷰에 적용된 점수 조회 핸들러
 * @param ctx 
 * koa 커스텀 확장 컨텍스트
 */
const selectReviewPointHandle = async (ctx : ExtendContext)=> {
    const reviewQuery = ctx.query.reviewId as string;

    if(typeof reviewQuery !== "string") 
        throw new ErrorObject(ErrorType.Request,"/point/review",400,`not exist or miss match type  reviewIdQuery query : url => ${ctx.url}`);
    
    const point = await selectReviewPointService(ctx,reviewQuery);
    if(point == null) {
        throw new ErrorObject(ErrorType.Request,"/point/review",400,`not exist review data : ${reviewQuery}`);
    }
    const responseBody = {point : point};
    ctx.status = 200;
    ctx.body = JSON.stringify(responseBody);
};
/**
 * 리뷰의 점수 증감시의 기록한 로그를 배열 형태로 응답하는 핸들러
 * @param ctx 
 * koa 커스텀 확장 컨텍스트
 */
const selectPointPlusLogHandle = async (ctx : ExtendContext) => {
    const log = await selectAllPointPlusLogService(ctx);
    ctx.status = 200;
    ctx.body = JSON.stringify(log);
}



controller.get("select-user-point","/point/user",selectUserPointHandle);
controller.get("select-review-point","/point/review",selectReviewPointHandle) ;
controller.get("select-point-plus-log","/point/log/plus",selectPointPlusLogHandle);
export default controller;

