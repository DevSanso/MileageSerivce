import {ExtendContext} from '../utils/extend/koa/context';

import RequestBody from '../api/body/event';
import ReviewPointFlag from '../models/review_point_flag';



import deleteImagesService from './db/delete_images';
import updateReviewPointFlagService from './db/update_review_point_flag';
import selectReviewPointFlagService from './db/select_review_point_flag';
import insertPointPlusLogService from './db/insert_plus_log';

import updateReviewCommentService from './db/update_review_comment';
import insertImagesService from './db/insert_images';


type ServiceArgsType = Omit<RequestBody,"action" | "type" | "userId" >;

const calcPointFlag = (f : ReviewPointFlag) => (f.isFirstReview ? 1 : 0) + (f.isTextWrite ? 1 : 0)  + (f.isUpdateImage ? 1 : 0);

const afterTreatment = async (ctx : ExtendContext,args : ServiceArgsType) => {
    const pre = await selectReviewPointFlagService(ctx,args.reviewId) as ReviewPointFlag;
    await updateReviewPointFlagService(ctx,args.reviewId,args.placeId);
    const current = await selectReviewPointFlagService(ctx,args.reviewId) as ReviewPointFlag;
    
    if (calcPointFlag(pre) < calcPointFlag(current)) 
        insertPointPlusLogService(ctx,args.reviewId,current);
    
};


const chkProps = <P extends keyof ServiceArgsType>(args : ServiceArgsType, props : P) => 
    args[props] !== undefined;

/**
 * 리뷰 데이터 업데이트 서비스
 * @param ctx 
 * koa 커스텀 컨텍스트, dao , db 커넥션 접근을 위해 사용
 * @param args 
 * 테이블 값 업데이트에 사용할 객체
 */
const modReviewService = async (ctx : ExtendContext,args : ServiceArgsType) => {
    const conn = await ctx.dbPoolConn;
    
    try {

        await conn.beginTransaction();
        /*
        이미지 배열, 컨텐츠 글의 존재 유무에 따라 각각에 맞는 서비스 호출
        */
        if(chkProps(args,"attachedPhotoIds")) {
            if(args["attachedPhotoIds"] === null)args.attachedPhotoIds = [];
            await deleteImagesService(ctx,args.reviewId);
            await insertImagesService(ctx,args.reviewId,args.attachedPhotoIds as Array<string>);
        }
        if(typeof args["content"] === "string") {
            await updateReviewCommentService(ctx,args.reviewId,args.content);
        }
         //모든 생성 및 업데이트가 완료되면 해당 테이블들을 조회하며, 해당 리뷰에 포인트를 부여
        //만약 포인트 증감이면 로그에 기록
        await afterTreatment(ctx,args);
        await conn.commit();
        
    }catch(e) {
        conn.rollback();
        throw e;
    }
};

export default modReviewService;
