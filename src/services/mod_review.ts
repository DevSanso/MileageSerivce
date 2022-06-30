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


const modReviewService = async (ctx : ExtendContext,args : ServiceArgsType) => {
    const conn = await ctx.dbPoolConn;
    
    try {

        await conn.beginTransaction();
        
        if(chkProps(args,"attachedPhotoIds")) {
            if(args["attachedPhotoIds"] === null)args.attachedPhotoIds = [];
            await deleteImagesService(ctx,args.reviewId);
            await insertImagesService(ctx,args.reviewId,args.attachedPhotoIds as Array<string>);
        }
        if(args["content"]) {
            await updateReviewCommentService(ctx,args.reviewId,args.content as string | null);
        }
        await afterTreatment(ctx,args);
        await conn.commit();
        
    }catch(e) {
        conn.rollback();
        throw e;
    }
};

export default modReviewService;
