import {ExtendContext} from '../utils/extend/koa/context';

import RequestBody from '../api/body/event';
import ReviewPointFlag from '../models/review_point_flag';



import createReviewService from './db/create_review';
import createUserPointService from './db/create_user_point';
import selectUserPointService from './db/select_user_point';
import updateReviewPointFlagService from './db/update_review_point_flag';
import selectReviewPointFlagService from './db/select_review_point_flag';
import insertPointPlusLogService from './db/insert_plus_log';
import selectReviewService from './db/select_review';
import updateReviewCommentService from './db/update_review_comment';
import insertImagesService from './db/insert_images';
import { ErrorObject, ErrorType } from '../middleware/type/error-object';
import existUserReivewInPlaceService from './db/exist_user_review_in_place';


type ServiceArgsType = Omit<RequestBody,"action" | "type" >;


const afterTreatment = async (ctx : ExtendContext,args : ServiceArgsType) => {
    const flag = await selectReviewPointFlagService(ctx,args.reviewId) as ReviewPointFlag;
    if(flag.isFirstReview || flag.isTextWrite || flag.isUpdateImage) 
        await insertPointPlusLogService(ctx,args.reviewId,flag);
};


const chkProps = <P extends keyof ServiceArgsType>(args : ServiceArgsType, props : P) => 
    args[props] !== undefined && args[props] !== null;

/**
 * 리뷰 생성 서비스
 * @param ctx 
 * koa 커스텀 컨텍스트, dao , db 커넥션 접근을 위해 사용
 * @param args 
 * 테이블 생성에 사용할 객체
 */
const addReviewService = async (ctx : ExtendContext,args : ServiceArgsType) => {
    const conn = await ctx.dbPoolConn;
    if(typeof args["content"] !== "string") {
        throw new ErrorObject(ErrorType.Request,"/events",400,"not exist content value in request body");
    }
    //장소에 리뷰 있는지 확인
    const exists = await existUserReivewInPlaceService(ctx,args.userId,args.placeId);
    if(exists) {
        throw new ErrorObject(ErrorType.Request,"/events",400,"already exist user review");
    }
    try {
        //reivew ,user_point 테이블에 튜플 생성 및 초기화
        await createReviewService(ctx,args);
        await createUserPointService(ctx,args.userId); 

            
        

        await conn.beginTransaction();

        let updateCommentPromise = updateReviewCommentService(ctx,args.reviewId,args.content);
        let insertImagesPromise : Promise<void> | null = null;
        
        /*
        이미지 배열, 컨텐츠 글의 존재 유무에 따라 각각에 맞는 서비스 호출
        */
        if(chkProps(args,"attachedPhotoIds")) {
            insertImagesPromise = insertImagesService(ctx,args.reviewId,args.attachedPhotoIds as Array<string>);
        }

 
        
        await updateCommentPromise;
        await insertImagesPromise;

        //모든 생성 및 업데이트가 완료되면 해당 테이블들을 조회하며, 해당 리뷰에 포인트를 부여
        await updateReviewPointFlagService(ctx,args.reviewId,args.placeId);
        //만약 포인트 증감이면 로그에 기록
        await afterTreatment(ctx,args);
        
        await conn.commit();
    }catch(e : any) {
        conn.rollback();
        if(e["errno"] == 1062)
            throw new ErrorObject(ErrorType.Request,"/events",400,"already exist review");
        throw e;
    }
};

export default addReviewService;

