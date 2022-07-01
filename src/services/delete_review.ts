import {ExtendContext} from '../utils/extend/koa/context';

import nonTxDeleteReviewService from './db/delete_review';
/**
 * 리뷰 삭제 서비스
 * @param ctx 
 * koa 커스텀 컨텍스트, dao , db 커넥션 접근을 위해 사용
 * @param reviewId 
 * 삭제할 리뷰 uuid
 */
const deleteReviewService = async (ctx : ExtendContext,reviewId : string) => {
    const conn = await ctx.dbPoolConn;
    try {
        await conn.beginTransaction();
        await nonTxDeleteReviewService(ctx,reviewId);
        await conn.commit();
    }catch(e) {
        conn.rollback();
        throw e;
    }
};

export default deleteReviewService;