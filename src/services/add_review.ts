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


type ServiceArgsType = Omit<RequestBody,"action" | "type" >;


const afterTreatment = async (ctx : ExtendContext,args : ServiceArgsType) => {
    const flag = await selectReviewPointFlagService(ctx,args.reviewId) as ReviewPointFlag;
    if(flag.isFirstReview || flag.isTextWrite || flag.isUpdateImage) 
        await insertPointPlusLogService(ctx,args.reviewId,flag);
};


const chkProps = <P extends keyof ServiceArgsType>(args : ServiceArgsType, props : P) => 
    args[props] !== undefined && args[props] !== null;


const addReviewService = async (ctx : ExtendContext,args : ServiceArgsType) => {
    const conn = await ctx.dbPoolConn;
   
    try {

        await createReviewService(ctx,args);
        await createUserPointService(ctx,args.userId); 

            
        

        await conn.beginTransaction();

        let updateCommentPromise : Promise<void> | null = null;
        let insertImagesPromise : Promise<void> | null = null;
        
        if(chkProps(args,"attachedPhotoIds")) {
            insertImagesPromise = insertImagesService(ctx,args.reviewId,args.attachedPhotoIds as Array<string>);
        }
        if(args["content"] !== undefined) {
            updateCommentPromise = updateReviewCommentService(ctx,args.reviewId,args.content as string | null);
        }
 
        
        await updateCommentPromise;
        await insertImagesPromise;

        await updateReviewPointFlagService(ctx,args.reviewId,args.placeId);
        await afterTreatment(ctx,args);
        
        await conn.commit();
    }catch(e : any) {
        conn.rollback();
        if(e["errno"] = 1062)
            throw new ErrorObject(ErrorType.Request,"/events",400,"already exist review");
        throw e;
    }
};

export default addReviewService;

